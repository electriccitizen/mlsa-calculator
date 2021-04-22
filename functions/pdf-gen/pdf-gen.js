"use strict"

const pdftk = require('node-pdftk')
const { processData } = require('./processors/process')

// AWS Lambda + PDFtk
// Set the PATH and LD_LIBRARY_PATH environment variables.
process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/src/functions/pdf-gen/src/bin`
process.env.LD_LIBRARY_PATH = `${process.env.LAMBDA_TASK_ROOT}/src/functions/pdf-gen/src/bin`

// Set the directory where temporary files are stored
pdftk.configure({
  tempDir: `${process.env.LAMBDA_TASK_ROOT}/src/functions/pdf-gen//node-pdftk-tmp`
})

// Set source to root directory with pdf files
const sourcePdfs =
  process.env.LOCAL_ENV === "true"
    ? `${process.env.LAMBDA_TASK_ROOT}/functions/pdf-gen/pdfs`
    : `${process.env.LAMBDA_TASK_ROOT}/src/functions/pdf-gen/pdfs`

// Sources pdf files
const pdfs = [{
  name: "wsa",
  src: `${sourcePdfs}/wsa-fillable.pdf`
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
  if (event.body !== null && event.body !== undefined) {
    const formData = JSON.parse(event.body)
    const data = processData(formData, pdfs)

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ pdftk: pdftk.input(), env: process.env }),
    })

    generatePdf(data)
      .then(buffer => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(buffer.toString('base64')),
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