const { getValueAsNumber } = require("../utils/helpers")
const { getAmount, convertPrecision, add, subtract, multiply, divide, lt, gt, minimum } = require('../utils/currency')

const calcWSB = (form, wsa) => {
    if (wsa["initiate.documents.ab"] !== "true") return {}

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

        // 01
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-1.child-${childIndex}`] = "X"
        })

        // 02
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-2.child-${childIndex}`] = divide(
                wsa["ppa.pcsa"],
                numChildren
            )
        })

        // 03
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-3.child-${childIndex}`] = divide(
                wsa["ppa.totalSupplement"],
                numChildren
            )
        })

        // 04
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-4.child-${childIndex}`] = add(
                data[`ws-b.part-1.line-2.child-${childIndex}`],
                data[`ws-b.part-1.line-3.child-${childIndex}`]
            )
        })

        // 05
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-5`] = add(
                (data[`ws-b.part-1.line-5`] || 0),
                data[`ws-b.part-1.line-4.child-${childIndex}`]
            )
        })

        // 06
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-6.child-${childIndex}`] =
                Number((getAmount(data[`ws-b.part-1.line-4.child-${childIndex}`]) / getAmount(data[`ws-b.part-1.line-5`])).toFixed(2))
        })

        // MOTHER’S DIVISION OF OBLIGATION
        // 07
        data[`ws-b.part-1.line-7`] = wsa["sola.mother.gross"]

        // 08
        data[`ws-b.part-1.line-8`] = wsa["sola.mother.amount"]

        // 09
        data[`ws-b.part-1.line-9`] = subtract(
            data[`ws-b.part-1.line-7`],
            data[`ws-b.part-1.line-8`]
        )

        // 10
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-10.child-${childIndex}`] = multiply(
                data[`ws-b.part-1.line-9`],
                data[`ws-b.part-1.line-6.child-${childIndex}`]
            )
        })

        // 11
        data[`ws-b.part-1.line-11`] = wsa["sola.mother.amount"]

        // 12
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-12.child-${childIndex}`] = divide(
                data[`ws-b.part-1.line-11`],
                numChildren
            )
        })

        // 13
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-13.child-${childIndex}`] = add(
                data[`ws-b.part-1.line-10.child-${childIndex}`],
                data[`ws-b.part-1.line-12.child-${childIndex}`]
            )
        })

        // 14 TODO
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-14.child-${childIndex}`] = divide(
                wsa["sola.mother.credit"],
                numChildren
            )
        })

        // 15
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-15.child-${childIndex}`] = subtract(
                data[`ws-b.part-1.line-13.child-${childIndex}`],
                data[`ws-b.part-1.line-14.child-${childIndex}`]
            )

            wsbData[`ws-b.part-2.line-1.mother.child-${(index * MAX_CHILDREN_PART_ONE) + childIndex}`] =
                data[`ws-b.part-1.line-15.child-${childIndex}`]
        })

        // FATHER’S DIVISION OF OBLIGATION
        // 16
        data[`ws-b.part-1.line-16`] = wsa["sola.father.gross"]

        // 17
        data[`ws-b.part-1.line-17`] = wsa["sola.father.amount"]

        // 18
        data[`ws-b.part-1.line-18`] = subtract(
            data[`ws-b.part-1.line-16`],
            data[`ws-b.part-1.line-17`]
        )

        // 19
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-19.child-${childIndex}`] = multiply(
                data[`ws-b.part-1.line-18`],
                data[`ws-b.part-1.line-6.child-${childIndex}`]
            )
        })

        // 20
        data[`ws-b.part-1.line-20`] = wsa["sola.father.amount"]

        // 21
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-21.child-${childIndex}`] = divide(
                data[`ws-b.part-1.line-20`],
                numChildren
            )
        })

        // 22
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-22.child-${childIndex}`] = add(
                data[`ws-b.part-1.line-19.child-${childIndex}`],
                data[`ws-b.part-1.line-21.child-${childIndex}`]
            )
        })

        // 23 TODO
        children.forEach(childIndex => {
            data[`ws-b.part-1.line-23.child-${childIndex}`] = divide(
                wsa["sola.father.credit"],
                numChildren
            )
        })

        // 24
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
            // LABELS
            data[`ws-b-part-2.child-${childIndex}`] = `Child 0${(index * MAX_CHILDREN_PART_TWO) + childIndex}`

            const motherDays = Number(wsa[`parenting.table25a.mother.child.${(index * MAX_CHILDREN_PART_TWO) + childIndex}`])
            const fatherDays = Number(wsa[`parenting.table25a.father.child.${(index * MAX_CHILDREN_PART_TWO) + childIndex}`])

            // 01
            data[`ws-b.part-2.line-1.mother.child-${childIndex}`] = wsbData[`ws-b.part-2.line-1.mother.child-${(index * MAX_CHILDREN_PART_TWO) + childIndex}`]
            data[`ws-b.part-2.line-1.father.child-${childIndex}`] = wsbData[`ws-b.part-2.line-1.father.child-${(index * MAX_CHILDREN_PART_TWO) + childIndex}`]

            // 02
            data[`ws-b.part-2.line-2.mother.child-${childIndex}`] = motherDays
            data[`ws-b.part-2.line-2.father.child-${childIndex}`] = fatherDays

            // 03
            if (motherDays <= STANDARD_ANNUAL_PARENTING_DAYS && fatherDays <= STANDARD_ANNUAL_PARENTING_DAYS) {
                if (motherDays > fatherDays) {
                    data[`ws-b.part-2.line-3.father.child-${childIndex}`] =
                        wsbData[`ws-b.part-2.line-1.father.child-${childIndex}`]
                } else {
                    data[`ws-b.part-2.line-3.mother.child-${childIndex}`] =
                        wsbData[`ws-b.part-2.line-1.mother.child-${childIndex}`]
                }
            } else {

                // 05
                data[`ws-b.part-2.line-5.mother.child-${childIndex}`] = motherDays - STANDARD_ANNUAL_PARENTING_DAYS
                data[`ws-b.part-2.line-5.father.child-${childIndex}`] = fatherDays - STANDARD_ANNUAL_PARENTING_DAYS

                // 07
                data[`ws-b.part-2.line-7.mother.child-${childIndex}`] =
                    data[`ws-b.part-2.line-5.mother.child-${childIndex}`] * CREDIT_FACTOR
                data[`ws-b.part-2.line-7.father.child-${childIndex}`] =
                    data[`ws-b.part-2.line-5.father.child-${childIndex}`] * CREDIT_FACTOR

                // 08
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

                // 09
                data[`ws-b.part-2.line-9.mother.child-${childIndex}`] = subtract(
                    data[`ws-b.part-2.line-1.mother.child-${childIndex}`],
                    data[`ws-b.part-2.line-8.mother.child-${childIndex}`]
                )
                data[`ws-b.part-2.line-9.father.child-${childIndex}`] = subtract(
                    data[`ws-b.part-2.line-1.father.child-${childIndex}`],
                    data[`ws-b.part-2.line-8.father.child-${childIndex}`]
                )

                // 10
                const motherDiff = subtract(
                    data[`ws-b.part-2.line-9.mother.child-${childIndex}`],
                    data[`ws-b.part-2.line-9.father.child-${childIndex}`]
                )
                const fatherDiff = subtract(
                    data[`ws-b.part-2.line-9.father.child-${childIndex}`],
                    data[`ws-b.part-2.line-9.mother.child-${childIndex}`]
                )

                if (gt(motherDiff, fatherDays)) {
                    data[`ws-b.part-2.line-10.mother.child-${childIndex}`] = motherDiff
                } else if (lt(motherDiff, fatherDays)) {
                    data[`ws-b.part-2.line-10.father.child-${childIndex}`] = fatherDiff
                }

                // 11
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

            // 04 STATIC FIELD
            data[`ws-b.part-2.line-4.mother.standard-days.child-${childIndex}`] = STANDARD_ANNUAL_PARENTING_DAYS
            data[`ws-b.part-2.line-4.father.standard-days.child-${childIndex}`] = STANDARD_ANNUAL_PARENTING_DAYS

            // 06 STATIC FIELD
            data[`ws-b.part-2.line-4.mother.credit-factor.child-${childIndex}`] = CREDIT_FACTOR
            data[`ws-b.part-2.line-4.father.credit-factor.child-${childIndex}`] = CREDIT_FACTOR

            // 12
            data[`ws-b.part-2.line-12.mother.child-${childIndex}`] =
                data[`ws-b.part-2.line-3.mother.child-${childIndex}`] || data[`ws-b.part-2.line-11.mother.child-${childIndex}`]

            wsaData[`parenting.table26a.mother.child.${(index * MAX_CHILDREN_PART_TWO) + childIndex}`] =
                convertPrecision(data[`ws-b.part-2.line-12.mother.child-${childIndex}`], 0)

            // Calc total
            wsaData[`parenting.table26a.mother.total`] = add(
                (wsaData[`parenting.table26a.mother.total`] || 0),
                (wsaData[`parenting.table26a.mother.child.${(index * MAX_CHILDREN_PART_TWO) + childIndex}`] || 0)
            )

            data[`ws-b.part-2.line-12.father.child-${childIndex}`] =
                data[`ws-b.part-2.line-3.father.child-${childIndex}`] || data[`ws-b.part-2.line-11.father.child-${childIndex}`]

            wsaData[`parenting.table26a.father.child.${(index * MAX_CHILDREN_PART_TWO) + childIndex}`] =
                convertPrecision(data[`ws-b.part-2.line-12.father.child-${childIndex}`], 0)

            // Calc total
            wsaData[`parenting.table26a.father.total`] = add(
                (wsaData[`parenting.table26a.father.total`] || 0),
                (wsaData[`parenting.table26a.father.child.${(index * MAX_CHILDREN_PART_TWO) + childIndex}`] || 0)
            )
        })

        return data
    })

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