'use strict';
const  pdfFiller = require('pdffiller-stream');
const sourcePDF = "/home/broeker/Projects/mlsa-calculator/functions/pdf-gen/mcsg-fillable.pdf";
const {Base64Encode} = require('base64-stream');
const http = require('http');
const concat = require('concat-stream');
const qs = require('querystring');
const flatten = require('flat').flatten;
// Update env to utilize custom PDFKit
process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/src/bin';
process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/src/bin'

const data = {
  "initiate.csed" : "1234",
  "basic.mother.name" : "Sally Sue",
  "basic.father.name" : "Bob Dickweed",
  "initiate.documents.a" : "On",
};

//exports.handler = async (event, context,callback) => {
exports.handler = function(event, context, callback) {
var body = ''
  if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body)
    console.log(flatten(body));
  } else {
    body = null
    console.log('no luck dipshit')
  }




  pdfFiller.fillForm( sourcePDF, data)
    .then((outputStream) => {
      outputStream = outputStream.pipe(new Base64Encode())
      streamToString(outputStream, (data) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        });
      });
    }).catch((err) => {
  });
};

// Return full stream.Readable at end
function streamToString(stream, cb) {
  const chunks = [];
  stream.on('data', (chunk) => {
    chunks.push(chunk.toString());
  });
  stream.on('end', () => {
    cb(chunks.join(''));
  });
}