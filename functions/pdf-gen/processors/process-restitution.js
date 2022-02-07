const { calcRestitution } = require("./restitution")

const processRestitutionData = (form, pdfs) => {
  // RESTITUTION WORKSHEET DATA
  const restitution = calcRestitution(form)
  
  return {
    restitution: {
        [pdfs.restitutionWorksheet]: restitution.data
    }
  }
}

module.exports = { processRestitutionData }