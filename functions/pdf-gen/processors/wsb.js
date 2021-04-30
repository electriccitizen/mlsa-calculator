const { getValueAsNumber } = require("../utils/helpers")
const { calcChildExpenses } = require("./percentages")
const { getAmount, convertPrecision, add, subtract, multiply, divide, lt, gt, minimum, isZero } = require('../utils/currency')

const calcWSB = (form, wsa) => {
    if (wsa["initiate.documents.ab"] !== "true") return null

    // Main
    let wsaData = {}
    let wsbData = {}

    // CONSTANT
    const MAX_CHILDREN_PART_ONE = 4
    const MAX_CHILDREN_PART_TWO = 2

    const numChildren = getValueAsNumber(form, "NumPrimaryChildren")
    const arrChildren = Array.apply(null, { length: numChildren }).map((_, index) => index)

    const partOneData = mapToPages(arrChildren, MAX_CHILDREN_PART_ONE).map((children, index) => {
        // Main part one
        let data = {}

        // PARENTS
        data["ws-b.part-1.mother"] = wsa["initiate.mother.name"]
        data["ws-b.part-1.father"] = wsa["initiate.father.name"]

        // CHILDREN
        children.forEach(childIndex => {
            data[`ws-b.part-1.child-col-${childIndex}`] = `Child 0${(index * MAX_CHILDREN_PART_ONE) + childIndex}`
        })

        // 01 Enter an "X" for each child from Worksheet A
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-1.child-${childIndex}`] = "X"
        })

        // 02 Divide line 11, WS-A by number of children on line 1, above. Enter the same amount for each child.
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-2.child-${childIndex}`] = divide(
                wsa["ppa.pcsa"],
                numChildren
            )
        })

        // 03 Enter the supplemental needs shown on WS-A, lines 12a, 12b, 12c, and 12d, broken out by child. 
        // Total for all children must match WS-A, line 12e.
        children.forEach(childIndex => {
            const childPrimaryIndex = (index * MAX_CHILDREN_PART_ONE) + (childIndex - 1)
            const primaryChildExpenses = calcChildExpenses(form, "ChildExpenses", childPrimaryIndex)
            const secondaryChildExpenses = calcChildExpenses(form, "ChildExpensesSecondary", childPrimaryIndex)
            data[`ws-b.part-1.line-3.child-${childIndex}`] = add(
                primaryChildExpenses.total,
                secondaryChildExpenses.total
            )
        })

        // 04 Total needs of each child; line 2 plus line 3
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-4.child-${childIndex}`] = add(
                data[`ws-b.part-1.line-2.child-${childIndex}`],
                data[`ws-b.part-1.line-3.child-${childIndex}`]
            )
        })

        // 05 Add all columns of line 4; enter in Totals column
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-5`] = add(
                (data[`ws-b.part-1.line-5`] || 0),
                data[`ws-b.part-1.line-4.child-${childIndex}`]
            )
        })

        // 06 For each child (column), divide line 4 by line 5
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-6.child-${childIndex}`] =
                Number((getAmount(data[`ws-b.part-1.line-4.child-${childIndex}`]) / getAmount(data[`ws-b.part-1.line-5`])).toFixed(2))
        })

        // MOTHER’S DIVISION OF OBLIGATION
        // 07 Enter Mother’s gross support from WS-A, line 22
        data[`ws-b.part-1.line-7`] = wsa["sola.mother.gross"]

        // 08 Enter amount from Mother’s WS-A, line 20
        data[`ws-b.part-1.line-8`] = wsa["sola.mother.amount"]

        // 09 Subtract line 8 from line 7
        data[`ws-b.part-1.line-9`] = subtract(
            data[`ws-b.part-1.line-7`],
            data[`ws-b.part-1.line-8`]
        )

        // 10 Multiply line 6 by line 9 for each child
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-10.child-${childIndex}`] = multiply(
                data[`ws-b.part-1.line-9`],
                data[`ws-b.part-1.line-6.child-${childIndex}`]
            )
        })

        // 11 Enter amount from Mother’s WS-A, line 20
        data[`ws-b.part-1.line-11`] = wsa["sola.mother.amount"]

        // 12 Divide line 11 by total children on line 1 (all sheets)
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-12.child-${childIndex}`] = divide(
                data[`ws-b.part-1.line-11`],
                numChildren
            )
        })

        // 13 Add line 10 and line 12
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-13.child-${childIndex}`] = add(
                data[`ws-b.part-1.line-10.child-${childIndex}`],
                data[`ws-b.part-1.line-12.child-${childIndex}`]
            )
        })

        // 14 Enter credit for payment of expenses for each child. Total must match WS-A, line 23 for Mother
        children.forEach(childIndex => {
            const childPrimaryIndex = (index * MAX_CHILDREN_PART_ONE) + (childIndex - 1)
            const primaryChildExpenses = calcChildExpenses(form, "ChildExpenses", childPrimaryIndex)
            data[`ws-b.part-1.line-14.child-${childIndex}`] = primaryChildExpenses.total
        })

        // 15 Mother’s support for each child: line 13 minus line 14 for each child; enter here and on WS-B, Part 2, line 1 of Mother’s column. 
        // If < 0, enter as negative number
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-15.child-${childIndex}`] = subtract(
                data[`ws-b.part-1.line-13.child-${childIndex}`],
                data[`ws-b.part-1.line-14.child-${childIndex}`]
            )

            wsbData[`ws-b.part-2.line-1.mother.child-${(index * MAX_CHILDREN_PART_ONE) + childIndex}`] =
                data[`ws-b.part-1.line-15.child-${childIndex}`]
        })

        // FATHER’S DIVISION OF OBLIGATION
        // 16 Enter Father’s gross obligation from WS-A, line 22
        data[`ws-b.part-1.line-16`] = wsa["sola.father.gross"]

        // 17 Enter amount from Father’s WS-A, line 20
        data[`ws-b.part-1.line-17`] = wsa["sola.father.amount"]

        // 18 Subtract line 17 from line 16
        data[`ws-b.part-1.line-18`] = subtract(
            data[`ws-b.part-1.line-16`],
            data[`ws-b.part-1.line-17`]
        )

        // 19 Multiply line 6 by line 18 for each child
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-19.child-${childIndex}`] = multiply(
                data[`ws-b.part-1.line-18`],
                data[`ws-b.part-1.line-6.child-${childIndex}`]
            )
        })

        // 20 Enter amount from Father’s WS-A, line 20
        data[`ws-b.part-1.line-20`] = wsa["sola.father.amount"]

        // 21 Divide line 20 by total children on line 1 (all sheets)
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-21.child-${childIndex}`] = divide(
                data[`ws-b.part-1.line-20`],
                numChildren
            )
        })

        // 22 Add line 19 and line 21
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-22.child-${childIndex}`] = add(
                data[`ws-b.part-1.line-19.child-${childIndex}`],
                data[`ws-b.part-1.line-21.child-${childIndex}`]
            )
        })

        // 23 Enter credit for payment of expenses for each child. Total must match WS-A, line 23 for Father
        children.forEach(childIndex => {
            const childPrimaryIndex = (index * MAX_CHILDREN_PART_ONE) + (childIndex - 1)
            const secondaryChildExpenses = calcChildExpenses(form, "ChildExpensesSecondary", childPrimaryIndex)
            data[`ws-b.part-1.line-23.child-${childIndex}`] = secondaryChildExpenses.total
        })

        // 24 Father’s support for each child: line 22 minus line 23 for each child; enter here and on WS-B, Part 2, line 1 of Father’s column. 
        // If < 0, enter as negative number
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-24.child-${childIndex}`] = subtract(
                data[`ws-b.part-1.line-22.child-${childIndex}`],
                data[`ws-b.part-1.line-23.child-${childIndex}`]
            )

            wsbData[`ws-b.part-2.line-1.father.child-${(index * MAX_CHILDREN_PART_ONE) + childIndex}`] =
                data[`ws-b.part-1.line-24.child-${childIndex}`]
        })

        return data
    })

    const partTwoData = mapToPages(arrChildren, MAX_CHILDREN_PART_TWO).map((children, index) => {
        // Main part two
        let data = {}

        // CONSTANT
        const STANDARD_ANNUAL_PARENTING_DAYS = 110
        const CREDIT_FACTOR = 0.0069

        children.forEach(childIndex => {
            const childPrimaryIndex = (index * MAX_CHILDREN_PART_TWO) + childIndex

            // LABELS
            data[`ws-b-part-2.child-${childIndex}`] = `Child 0${childPrimaryIndex}`

            const motherDays = Number(wsa[`parenting.table25a.mother.child.${childPrimaryIndex}`])
            const fatherDays = Number(wsa[`parenting.table25a.father.child.${childPrimaryIndex}`])

            // 01 Enter each parent’s obligation for this child from Worksheet B, Part 1, line 15 for Mother and line 24 for Father
            data[`ws-b.part-2.line-1.mother.child-${childIndex}`] = wsbData[`ws-b.part-2.line-1.mother.child-${childPrimaryIndex}`]
            data[`ws-b.part-2.line-1.father.child-${childIndex}`] = wsbData[`ws-b.part-2.line-1.father.child-${childPrimaryIndex}`]

            // 02 Enter number of days* this child spends with each parent during the year
            data[`ws-b.part-2.line-2.mother.child-${childIndex}`] = motherDays
            data[`ws-b.part-2.line-2.father.child-${childIndex}`] = fatherDays

            // 03 If line 2 is greater than 110 for both parents, skip to line 5. 
            // If not, enter the obligation from line 1 of the parent with the least number of days.Leave the other parent’s line blank.
            // Go to line 12.
            if (motherDays <= STANDARD_ANNUAL_PARENTING_DAYS && fatherDays <= STANDARD_ANNUAL_PARENTING_DAYS) {
                if (motherDays > fatherDays) {
                    data[`ws-b.part-2.line-3.father.child-${childIndex}`] =
                        wsbData[`ws-b.part-2.line-1.father.child-${childIndex}`]
                } else {
                    data[`ws-b.part-2.line-3.mother.child-${childIndex}`] =
                        wsbData[`ws-b.part-2.line-1.mother.child-${childIndex}`]
                }
            } else {
                // 05 Subtract line 4 from line 2
                data[`ws-b.part-2.line-5.mother.child-${childIndex}`] = motherDays - STANDARD_ANNUAL_PARENTING_DAYS
                data[`ws-b.part-2.line-5.father.child-${childIndex}`] = fatherDays - STANDARD_ANNUAL_PARENTING_DAYS

                // 07 Multiply line 6 by line 5
                data[`ws-b.part-2.line-7.mother.child-${childIndex}`] =
                    data[`ws-b.part-2.line-5.mother.child-${childIndex}`] * CREDIT_FACTOR
                data[`ws-b.part-2.line-7.father.child-${childIndex}`] =
                    data[`ws-b.part-2.line-5.father.child-${childIndex}`] * CREDIT_FACTOR

                // 08 Multiply line 7 by line 1 and round according to instructions on Worksheet A, page 2.
                data[`ws-b.part-2.line-8.mother.child-${childIndex}`] = convertPrecision(
                    multiply(
                        data[`ws-b.part-2.line-1.mother.child-${childIndex}`],
                        data[`ws-b.part-2.line-7.mother.child-${childIndex}`]
                    ), 0)
                data[`ws-b.part-2.line-8.father.child-${childIndex}`] = convertPrecision(
                    multiply(
                        data[`ws-b.part-2.line-1.father.child-${childIndex}`],
                        data[`ws-b.part-2.line-7.father.child-${childIndex}`]
                    ), 0)

                // 09 Subtract line 8 from line 1
                data[`ws-b.part-2.line-9.mother.child-${childIndex}`] = subtract(
                    data[`ws-b.part-2.line-1.mother.child-${childIndex}`],
                    data[`ws-b.part-2.line-8.mother.child-${childIndex}`]
                )
                data[`ws-b.part-2.line-9.father.child-${childIndex}`] = subtract(
                    data[`ws-b.part-2.line-1.father.child-${childIndex}`],
                    data[`ws-b.part-2.line-8.father.child-${childIndex}`]
                )

                // 10 Determine the difference between line 9 for Mother and line 9 for Father; enter in the column of the parent with the higher obligation
                const motherDiff = subtract(
                    data[`ws-b.part-2.line-9.mother.child-${childIndex}`],
                    data[`ws-b.part-2.line-9.father.child-${childIndex}`]
                )
                const fatherDiff = subtract(
                    data[`ws-b.part-2.line-9.father.child-${childIndex}`],
                    data[`ws-b.part-2.line-9.mother.child-${childIndex}`]
                )

                if (gt(motherDiff, fatherDiff)) {
                    data[`ws-b.part-2.line-10.mother.child-${childIndex}`] = motherDiff
                } else if (lt(motherDiff, fatherDiff)) {
                    data[`ws-b.part-2.line-10.father.child-${childIndex}`] = fatherDiff
                }

                // 11 If entry on line 10, compare to entry on line 1; enter smaller amount here.
                if (data[`ws-b.part-2.line-10.mother.child-${childIndex}`]) {
                    data[`ws-b.part-2.line-11.mother.child-${childIndex}`] = minimum(
                        data[`ws-b.part-2.line-10.mother.child-${childIndex}`],
                        data[`ws-b.part-2.line-1.mother.child-${childIndex}`]
                    )
                }
                if (data[`ws-b.part-2.line-10.father.child-${childIndex}`]) {
                    data[`ws-b.part-2.line-11.father.child-${childIndex}`] = minimum(
                        data[`ws-b.part-2.line-10.father.child-${childIndex}`],
                        data[`ws-b.part-2.line-1.father.child-${childIndex}`]
                    )
                }
            }

            // 04 Standard annual parenting days - STATIC FIELD
            data[`ws-b.part-2.line-4.mother.standard-days.child-${childIndex}`] = STANDARD_ANNUAL_PARENTING_DAYS
            data[`ws-b.part-2.line-4.father.standard-days.child-${childIndex}`] = STANDARD_ANNUAL_PARENTING_DAYS

            // 06 Credit factor - STATIC FIELD
            data[`ws-b.part-2.line-4.mother.credit-factor.child-${childIndex}`] = CREDIT_FACTOR
            data[`ws-b.part-2.line-4.father.credit-factor.child-${childIndex}`] = CREDIT_FACTOR

            // 12 Enter amount from line 3 or line 11, here, and in the same parent’s column of Table 26-A, Worksheet A, page 2, for this child.
            data[`ws-b.part-2.line-12.mother.child-${childIndex}`] =
                data[`ws-b.part-2.line-3.mother.child-${childIndex}`] || data[`ws-b.part-2.line-11.mother.child-${childIndex}`]
            data[`ws-b.part-2.line-12.father.child-${childIndex}`] =
                data[`ws-b.part-2.line-3.father.child-${childIndex}`] || data[`ws-b.part-2.line-11.father.child-${childIndex}`]

            // WS-A Table 26-A: ANNUAL CHILD SUPPORT PER CHILD
            wsaData[`parenting.table26a.mother.child.${childPrimaryIndex}`] =
                convertPrecision(data[`ws-b.part-2.line-12.mother.child-${childIndex}`], 0)
            wsaData[`parenting.table26a.father.child.${childPrimaryIndex}`] =
                convertPrecision(data[`ws-b.part-2.line-12.father.child-${childIndex}`], 0)
            wsaData[`parenting.table26a.mother.total`] = add(
                (wsaData[`parenting.table26a.mother.total`] || 0),
                (wsaData[`parenting.table26a.mother.child.${childPrimaryIndex}`] || 0)
            )
            wsaData[`parenting.table26a.father.total`] = add(
                (wsaData[`parenting.table26a.father.total`] || 0),
                (wsaData[`parenting.table26a.father.child.${childPrimaryIndex}`] || 0)
            )

            // WS-A Table 26-B: MONTHLY SUPPORT PER CHILD
            wsaData[`parenting.table26b.mother.child.${childPrimaryIndex}`] =
                convertPrecision(divide(wsaData[`parenting.table26a.mother.child.${childPrimaryIndex}`], 12), 0)
            wsaData[`parenting.table26b.father.child.${childPrimaryIndex}`] =
                convertPrecision(divide(wsaData[`parenting.table26a.father.child.${childPrimaryIndex}`], 12), 0)
            wsaData["parenting.table26b.mother.total"] = add(
                (wsaData["parenting.table26b.mother.total"] || 0),
                wsaData[`parenting.table26b.mother.child.${childPrimaryIndex}`]
            )
            wsaData["parenting.table26b.father.total"] = add(
                (wsaData["parenting.table26b.father.total"] || 0),
                wsaData[`parenting.table26b.father.child.${childPrimaryIndex}`]
            )
        })

        return data
    })

    // WS-A 27 FINAL MONTHLY TRANSFER PAYMENT
    if (gt(wsaData["parenting.table26b.mother.total"], wsaData["parenting.table26b.father.total"])) {
        wsaData["parenting.monthlyTransferPayment.mother"] = subtract(
            wsaData["parenting.table26b.mother.total"],
            wsaData["parenting.table26b.father.total"]
        )
    } else if (gt(wsaData["parenting.table26b.father.total"], wsaData["parenting.table26b.mother.total"])) {
        wsaData["parenting.monthlyTransferPayment.father"] = subtract(
            wsaData["parenting.table26b.father.total"],
            wsaData["parenting.table26b.mother.total"]
        )
    } else {
        if (isZero(wsaData["parenting.table26b.mother.total"])) {
            wsaData["parenting.monthlyTransferPayment.mother"] = wsaData["parenting.table26b.mother.total"]
        }
        if (isZero(wsaData["parenting.table26b.father.total"])) {
            wsaData["parenting.monthlyTransferPayment.father"] = wsaData["parenting.table26b.father.total"]
        }
    }

    return { wsaData, partOneData, partTwoData }
}

// Helpers
const mapToPages = (children, maxChildren) => {
    return Object.values(children.reduce((pages, childIndex) => {
        // Get current number of page
        const current = Object.keys(pages).length - 1

        // Set next number of page
        const next = childIndex % maxChildren === 0 ? current + 1 : current

        return {
            ...pages,
            [next]: [
                ...(pages[next] || []),
                (childIndex % maxChildren) + 1
            ]
        }
    }, {}))
}

module.exports = { calcWSB }