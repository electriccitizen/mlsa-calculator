// Hard-coded data for testing, copied from # Debug - Form values
const init = require('./init.json')
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

const processData = (form, pdfs) => {
  // Override pdfs array to object with names
  pdfs = pdfs && pdfs.reduce((names, pdf) => ({ ...names, [pdf.name]: pdf.name }), {})

  // Pass hard-coded data to processors instead of form (init.json)
  form = init

  const documents = getValue(form, "Documents")
  const isWorksheets = documents === DOCUMENTS.BOTH || documents === DOCUMENTS.WORKSHEETS
  const isAffidavit = documents === DOCUMENTS.BOTH || documents === DOCUMENTS.AFFIDAVIT

  // WORKSHEET A DATA
  const wsa = isWorksheets && calcWSA(form)

  // WORKSHEET A ADDENDUM
  const addendum = isWorksheets && getAddendum(form, wsa.addendum)

  // WORKSHEET B DATA
  const wsb = isWorksheets && calcWSB(form, wsa.data)

  // FINANCIAL AFFIDAVIT
  const affidavit = isAffidavit && getAffidavit(form)

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
        ...affidavit && { [pdfs.affidavit]: affidavit }
      })
    }
  }
}

module.exports = { processData }
