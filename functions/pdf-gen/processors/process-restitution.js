const processRestitutionData = (form, pdfs) => {
  return {
    restitution: {
        [pdfs.restitutionWorksheet]: {
          "test": "Test"
        }
    }
  }
}

module.exports = { processRestitutionData }