const { getAffidavitA } = require('./affidafit-a')
const { getAffidavitB } = require('./affidafit-b')
const { getAffidavitC } = require('./affidafit-c')
const { getAffidavitD } = require('./affidafit-d')
const { getAffidavitE } = require('./affidafit-e')
const { getAffidavitF } = require('./affidafit-f')
const { splitLines, flattenLines, setInvalidValuesAsNA } = require('../utils/helpers')

// Static fields width in pixels
const FIELDS_WIDTH = {
    "addendum": 738,
}

const getAffidavit = (form) => {
    let affidavitA = getAffidavitA(form)
    let affidavitB = getAffidavitB(form)
    let affidavitC = getAffidavitC(form)
    let affidavitD = getAffidavitD(form)
    let affidavitE = getAffidavitE(form)
    let affidavitF = getAffidavitF(form)

    let data = {
        ...affidavitA.data,
        ...affidavitB.data,
        ...affidavitC.data,
        ...affidavitD.data,
        ...affidavitE.data,
        ...affidavitF.data,
    }

    let addendum = [
        ...affidavitA.addendum,
        ...affidavitB.addendum,
        ...affidavitC.addendum,
        ...affidavitD.addendum,
        ...affidavitE.addendum,
        ...affidavitF.addendum,
    ]

    return {
        // Set invalid values as N/A
        data: setInvalidValuesAsNA(data),
        // Divide into lines
        addendum: addendum
            .filter(addendumData => !!addendumData)
            .map(addendumData => flattenLines(addendumData))
            .map(addendumData => splitLines(addendumData, FIELDS_WIDTH["addendum"], ""))
    }
}

module.exports = { getAffidavit }