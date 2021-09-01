"use strict"

const pdftk = require('node-pdftk')
const path = require('path')
const { processData } = require('./processors/process')
const fs = require('fs')

// Set the root path
const ROOT =
  process.env.LOCAL_ENV === "true" ?
    `${process.env.LAMBDA_TASK_ROOT}/functions/pdf-gen` :
    `${process.env.LAMBDA_TASK_ROOT}/functions/pdf-gen`

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

exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(pdfs.map(pdf => ({ ...pdf, isExists: fs.existsSync(pdf.src) }))),
  })
  if (event.body !== null && event.body !== undefined) {
    const formData = JSON.parse(event.body)
    const data = processData(formData, pdfs)
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
  } else {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify("No data body."),
    })
  }
}
