var moment = require("moment")
const {
  currency,
  add,
  multiply,
  format,
  convertPrecision,
} = require("../utils/currency")
const {
  getValueAsArray,
  getValueAsNumber,
  getValue,
  camelize,
  flatten,
  getValuesAsString,
} = require("../utils/helpers")
const { getIRSBusinessMileageRate } = require("../utils/support-tables")

// Fields that should have the value === "yes"
const fieldsRequired = {
  FuneralExpenses: [["status"]],
  MedicalExpenses: [["injury", "expenses", "onetime"]],
  FirstResponderExpenses: [["status"]],
  SupplyExpenses: [["status"]],
  FutureExpenses: [["status", "est"]],
  FutureExpensesRecurring: [["status", "est"]],
  MentalHealthExpenses: [["status", "current"]],
  MentalHealthFuture: [["status", "est"]],
  PropertyStolenRecovered: [
    ["damaged", "replaceRepair"], // OR
    ["damaged", "rental"],
  ],
  PropertyStolenLost: [["replace"]],
  PropertyDamage: [["status"]],
  LostWages: [["status"]],
  LostWagesCourt: [["status"]],
  LostWagesOther: [["status"]],
  LostWagesFuture: [["status"]],
  LostWagesCarTravel: [["status", "car"]],
  LostWagesOtherTravel: [["status"]],
  Moving: [["status"]],
  Safety: [["status"]],
  Education: [["status"]],
  Other: [["status"]],
}

const calcRestitution = form => {
  // Filter data
  const formFiltered = Object.entries(form).reduce(
    (acc, [formKey, formData]) => {
      if (
        formKey === "Primary" ||
        (fieldsRequired[formKey] &&
          fieldsRequired[formKey].some(fieldsKeys => {
            return fieldsKeys.every(
              fieldKey => getValue(formData, [fieldKey]) === "yes"
            )
          }))
      ) {
        return { ...acc, [formKey]: formData }
      } else {
        return acc
      }
    },
    {}
  )

  // Calc total
  const formCalced = Object.entries(formFiltered).reduce(
    (acc, [formKey, formData]) => {
      if (formKey === "Primary") {
        // Personal Information
        // Case Information
        return {
          ...acc,
          [formKey]: {
            ...formData,
            fullName: getValuesAsString(formData, [
              ["fname"],
              ["mname"],
              ["lname"],
            ]),
          },
        }
      } else {
        const data = getValueAsArray(formData, ["data"])
        const total = data.reduce((total, item, index) => {
          // Max 3 items
          if (index < 3) {
            if (formKey === "MentalHealthFuture") {
              // [H] MentalHealthFuture
              const amount = multiply(
                  getValueAsNumber(item, ["amt"]),
                  getValueAsNumber(item, ["sessions"])
              )

              return add(total, amount)
            } else if (
              formKey === "FutureExpensesRecurring"
            ) {
              // [F] FutureExpensesRecurring
              const amount = multiply(
                  getValueAsNumber(item, ["amt"]),
                  getValueAsNumber(item, ["sessions"])
              )

              return add(total, amount)
            } else if (
              formKey === "PropertyStolenRecovered" ||
              formKey === "PropertyStolenLost" ||
              formKey === "PropertyDamage"
            ) {

              // [I] PropertyStolenRecovered
              // [J] PropertyStolenLost
              // [K] PropertyDamage
              const amount = add(
                  getValueAsNumber(item, ["expense"]),
                  getValueAsNumber(item, ["amt"]),
                  getValueAsNumber(item, ["amtInsurance"])
              )

              const totalExpense = getValueAsNumber(item, ["expense"])
              // const amtPaid = getValueAsNumber(item, ["amt"])
              const amtPaidInsurance = getValueAsNumber(item, ["amtInsurance"])

              const totalAmountPaid = (totalExpense - amtPaidInsurance)

              return add(total, totalAmountPaid)

            } else if (
              formKey === "LostWages" ||
              formKey === "LostWagesCourt" ||
              formKey === "LostWagesOther"
            ) {
              // [L] LostWages
              // [M] LostWagesCourt
              // [N] LostWagesOther
              const amount = multiply(
                getValueAsNumber(item, ["amt"]),
                getValueAsNumber(item, ["hours"])
              )

              return add(total, amount)
            } else if (formKey === "LostWagesCarTravel") {
              // [P] LostWagesCarTravel
              const globalMileageRate = getIRSBusinessMileageRate()
              const mileageCost = multiply(
                globalMileageRate,
                getValueAsNumber(item, ["distance"])
              )

              return add(total, mileageCost)
            } else {
              // [A] FuneralExpenses
              // [B] MedicalExpenses
              // [C] FirstResponderExpenses
              // [D] SupplyExpenses
              // [E] FutureExpenses
              // [F] FutureExpensesRecurring **
              // [G] MentalHealthExpenses
              // [O] LostWagesFuture
              // [Q] LostWagesOtherTravel
              // [R] Moving
              // [S] Safety
              // [T] Education
              // [U] Other

              return add(total, getValueAsNumber(item, ["amt"]))
            }
          } else {
            return total
          }
        }, currency())

        return {
          ...acc,
          summaryTotal: add(acc.summaryTotal, total),
          [formKey]: {
            ...formData,
            ...(data &&
              data.length > 0 && {
                total,
              }),
          },
        }
      }
    },
    {
      summaryTotal: 0,
    }
  )

  // Parse data
  const formParsed = Object.entries(formCalced).reduce(
    (acc, [formKey, formData]) => {
      if (formKey === "summaryTotal") {
        return {
          ...acc,
          [formKey]: format(convertPrecision(formData, 2), "currency"),
        }
      }


      const data = getValueAsArray(formData, ["data"]).map(item => {
        const date = getValue(item, ["date"])

        let amt = getValue(item, ["amt"])
        amt = amt.replace(/,/g, "")

        const amtInsurance = getValue(item, ["amtInsurance"])
        const expense = getValue(item, ["expense"])

        return {
          ...item,
          ...(date && { date: moment(date).format("L") }),
          ...(amt && { amt: format(amt , "currency")}),
          ...(amtInsurance && {
            amtInsurance: format(amtInsurance, "currency"),
          }),
          ...(expense && { expense: format(expense, "currency") }),
        }
      })

      const total = getValue(formData, ["total"])
      return {
        ...acc,
        [camelize(formKey)]: {
          ...formData,
          ...(data &&
            data.length > 0 && {
              data,
              total: format(convertPrecision(total, 2), "currency"),
            }),
        },
      }
    },
    {}
  )

  return {
    // RESTITUTION WORKSHEET DATA
    data: flatten(formParsed),
  }
}

module.exports = { calcRestitution }
