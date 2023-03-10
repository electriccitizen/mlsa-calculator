"use strict"

const pdftk = require('node-pdftk')
const path = require('path')
const { processData: processChildSupportData } = require('./processors/process')
const { processRestitutionData } = require('./processors/process-restitution')

// Set the root path
const ROOT = `${process.env.LAMBDA_TASK_ROOT}/functions/pdf-gen`

// AWS Lambda + PDFtk
// Set the PATH and LD_LIBRARY_PATH environment variables.
process.env.PATH = `${process.env.PATH}:${ROOT}/src/bin`
process.env.LD_LIBRARY_PATH = `${ROOT}/src/bin`

// Set the directory where temporary files are stored
if (process.env.LOCAL_ENV !== "true") {
  pdftk.configure({
    tempDir: path.join('/tmp')
  })
}

// Sources pdf files
const pdfs = [{
  name: "wsa",
  src: `${ROOT}/pdfs/wsa-fillable.pdf`
}, {
  name: "addendum",
  src: `${ROOT}/pdfs/addendum-fillable.pdf`
}, {
  name: "wsbPartOne",
  src: `${ROOT}/pdfs/wsb-part-1-fillable.pdf`
}, {
  name: "wsbPartTwo",
  src: `${ROOT}/pdfs/wsb-part-2-fillable.pdf`
}, {
  name: "affidavit",
  src: `${ROOT}/pdfs/affidavit-fillable.pdf`
}, {
  name: "affidavitAddendum",
  src: `${ROOT}/pdfs/affidavit-addendum-fillable.pdf`
}, {
  name: "restitutionWorksheet",
  src: `${ROOT}/pdfs/MLSA-restitution-worksheet-fillable.pdf`
}]

const fillPdf = (pdf, data) => {
  return pdftk
    .input(pdf)
    .fillForm(data)
    .flatten()
    .output()
}

const generatePdf = values => {
  // Fill pdfs
  const promises =
    Object
      .entries(values)
      .reduce((promises, [key, value]) => {
        const pdf = pdfs.find(pdf => pdf.name === key)
        if (pdf) {
          return [
            ...promises,
            ...(Array.isArray(value) ? value : Array(value))
              .map(data => fillPdf(pdf.src, data))
          ]
        } else {
          return promises
        }
      }, [])
  // Merge pdfs
  return Promise
    .all(promises)
    .then(pdfs => {
      return pdftk
        .input(pdfs)
        .output()
    })
}

const processData = (formData, app) => {
  // Override pdfs array to object with names
  const pdfsNames = pdfs.reduce((names, pdf) => ({ ...names, [pdf.name]: pdf.name }), {})

  switch(app) {
    case 'child-support':
      return processChildSupportData(formData, pdfsNames)
    case 'restitution': 
      return processRestitutionData(formData, pdfsNames)
    default: 
      throw new Error(`Unhandled app: ${app}`)
  }
}

exports.handler = function (event, context, callback) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    }
  }

  try {
    if (!event.body) {
      throw new Error("No data body.")
    }

    const { app, formData } = JSON.parse(event.body)
    const data = processData(formData, app)
    const keys = Object.keys(data)
    const values = Object.values(data)
    const promises = values.map(value => generatePdf(value))

    Promise
      .all(promises)
      .then(pdfs => {
        // Zip object
        const results = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: pdfs[index].toString('base64') }
        }, {})

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(results),
        })
      })
      .catch(error => {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify(error),
        })
      })
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message
    }
  }
}