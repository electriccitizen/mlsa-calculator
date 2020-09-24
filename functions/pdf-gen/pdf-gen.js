"use strict"
const pdfFiller = require("pdffiller-stream")
const sourcePDF =
  "/home/broeker/Projects/mlsa-calculator/functions/pdf-gen/mcsg-fillable.pdf"
const { Base64Encode } = require("base64-stream")
const http = require("http")
const concat = require("concat-stream")
const qs = require("querystring")
const flatten = require("flat").flatten
var exec = require("child_process").exec
// Update env to utilize custom PDFKit
process.env.PATH =
  process.env.PATH + ":" + process.env.LAMBDA_TASK_ROOT + "/src/bin"
process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + "/src/bin"
  ///var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin:/var/task/src/bin
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
  // var body = ""
  // if (event.body !== null && event.body !== undefined) {
  //   const formData = JSON.parse(event.body)
  //   processData(formData)
  // } else {
  //   body = null
  //   console.log("error")
  // }
  //console.log(exec("pdftk --version", context.done))
  //console.log(exec("pwd"))
  //console.log(process.env.PATH + '--' + process.env.LAMBDA_TASK_ROOT + '--' + process.env.LD_LIBRARY_PATH)
  //localhost:8888/
  // pdfFiller
  //   .fillForm(sourcePDF, data)
  //   .then(outputStream => {
  //     console.log("i am a happy little stream")
  //     // use the outputStream here;
  //     // will be instance of stream.Readable
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // exec("pdftk --version", (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });

  //exec("pdftk --version", (error, stdout, stderr) => {
  exec("ls -lah /var/task/src/bin"), (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });


  callback(null, {
    statusCode: 200,
    body: JSON.stringify([]),
  })
  // pdfFiller
  //   .fillForm(sourcePDF, data)
  //   .then(outputStream => {
  //     outputStream = outputStream.pipe(new Base64Encode())
  //     streamToString(outputStream, data => {
  //       callback(null, {
  //         statusCode: 200,
  //         body: JSON.stringify(data),
  //       })
  //     })
  //   })
  //   .catch(err => {})
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
