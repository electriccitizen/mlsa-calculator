"use strict"
const pdfFiller = require("pdffiller-stream")
const sourcePDF =
  process.env.LOCAL_ENV === "true"
    ? process.env.LAMBDA_TASK_ROOT + "/functions/pdf-gen/mcsg-fillable.pdf"
    : process.env.LAMBDA_TASK_ROOT + "/src/functions/pdf-gen/mcsg-fillable.pdf"

const { Base64Encode } = require("base64-stream")
// const flatten = require("flat").flatten
// var exec = require("child_process").exec

process.env.PATH =
  process.env.PATH +
  ":" +
  process.env.LAMBDA_TASK_ROOT +
  "/src/functions/pdf-gen/src/bin"
process.env.LD_LIBRARY_PATH =
  process.env.LAMBDA_TASK_ROOT + "/src/functions/pdf-gen/src/bin"


const data = {
  "initiate.csed": "1234",
  "basic.mother.name": "Dane Doe",
  "basic.father.name": "Dohnny Doe",
  "initiate.documents.a": "On",
}

function processData(myData) {
  data["basic.mother.name"] = myData.Primary.fname + " " + myData.Primary.lname
  data["basic.father.name"] =
    myData.OtherParent.fname + " " + myData.OtherParent.lname
  return data
}

exports.handler = function (event, context, callback) {
  var body = ""
  if (event.body !== null && event.body !== undefined) {
    const formData = JSON.parse(event.body)
    processData(formData)
  } else {
    body = null
    console.log("error")
  }

  pdfFiller
    .fillForm(sourcePDF, data)
    .then(outputStream => {
      outputStream = outputStream.pipe(new Base64Encode())
      streamToString(outputStream, data => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        })
      })
    })
    .catch(err => {})
}

// Return full stream.Readable at end
function streamToString(stream, cb) {
  const chunks = []
  stream.on("data", chunk => {
    chunks.push(chunk.toString())
  })
  stream.on("end", () => {
    cb(chunks.join(""))
  })
}
