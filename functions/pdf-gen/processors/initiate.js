var moment = require("moment")
const { getValue, getValueAsArray } = require('../utils/helpers')

const getInitiate = form => {

    // Main
    let data = {}

    // Case #
    data["initiate.csed"] = getValue(form, ["CSED"])

    // Basic info
    data["initiate.mother.name"] = `${getValue(form, ["Primary", "fname"], "")} ${getValue(form, ["Primary", "lname"], "")}`
    data["initiate.father.name"] = `${getValue(form, ["OtherParent", "fname"], "")} ${getValue(form, ["OtherParent", "lname"], "")}`

    // Primary children DOB
    const children = getValueAsArray(form, ["PrimaryChildren"])
    children.forEach(
        (child, index) => {
            const dob = getValue(child, ["dob"])
            if (dob) {
                data[`child.${index + 1}.bday`] = moment(dob).format('YYYY')
            }
        }
    )

    return { data }
}

module.exports = { getInitiate }
