// Hard-coded data for testing, copied from # Debug - Form values
// const init = require('./init.json')
const { formatData } = require("../utils/currency")
const { getValue } = require("../utils/helpers")

const { calcWSA } = require("./wsa")
const { getAddendum } = require("./addendum")
const { calcWSB } = require("./wsb")
const { getAffidavit } = require('./affidavit')

// Available documents
const DOCUMENTS = {
  BOTH: "both",
  WORKSHEETS: "worksheets",
  AFFIDAVIT: "affadavit"
}

// Max lines in addendum
const ADDENDUM_MAX_LINES = {
  WORKSHEETS: 62,
  AFFIDAVIT: 58
}

const processData = (form, pdfs) => {
  // Pass hard-coded data to processors instead of form (init.json)
  // form = init

  const documents = getValue(form, "Documents")
  const isWorksheets = documents === DOCUMENTS.BOTH || documents === DOCUMENTS.WORKSHEETS
  const isAffidavit = documents === DOCUMENTS.BOTH || documents === DOCUMENTS.AFFIDAVIT

  // WORKSHEET A DATA
  const wsa = isWorksheets && calcWSA(form)

  // WORKSHEET A ADDENDUM
  const addendum = isWorksheets && getAddendum(form, wsa.addendum, ADDENDUM_MAX_LINES["WORKSHEETS"])

  // WORKSHEET B DATA
  const wsb = isWorksheets && calcWSB(form, wsa.data)

  // FINANCIAL AFFIDAVIT
  const affidavit = isAffidavit && getAffidavit(form)

  // FINANCIAL AFFIDAVIT ADDENDUM
  const affidavitAddendum = isAffidavit && getAddendum(form, affidavit.addendum, ADDENDUM_MAX_LINES["AFFIDAVIT"])

  return {
    ...isWorksheets && {
      [DOCUMENTS.WORKSHEETS]: formatData({
        ...wsa && { [pdfs.wsa]: { ...wsa.data, ...wsb && wsb.wsaData } },
        ...addendum && { [pdfs.addendum]: addendum },
        ...wsb && { [pdfs.wsbPartOne]: wsb.partOneData },
        ...wsb && { [pdfs.wsbPartTwo]: wsb.partTwoData }
      })
    },
    ...isAffidavit && {
      [DOCUMENTS.AFFIDAVIT]: formatData({
        ...affidavit && { [pdfs.affidavit]: affidavit.data },
        ...affidavitAddendum && { [pdfs.affidavitAddendum]: affidavitAddendum }
      })
    }
  }
}

module.exports = { processData }
