'use strict';
const  pdfFiller = require('pdffiller-stream');
const sourcePDF = "/home/broeker/Projects/mlsa-calculator/functions/pdf-gen/mcsg-fillable.pdf";
const {Base64Encode} = require('base64-stream');
const http = require('http');
const concat = require('concat-stream');
const qs = require('querystring');
const flatten = require('flat').flatten;
var exec = require('child_process').exec;
// Update env to utilize custom PDFKit
process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/src/bin';
process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/src/bin'

const data = {
  "initiate.csed" : "1234",
  "basic.mother.name" : "Sally Joe Johnson",
  "basic.father.name" : "Bob Dickweed",
  "initiate.documents.a" : "On",
};

const boo = { 'basic.mname': null,
  'basic.': null,
  'basic.fname': 'safd',
  'basic.lname': 'asdf',
  'basic.address': 'asdf',
  'basic.city': 'asdf',
  'basic.state': 'asdf',
  'basic.zip': 'asdf',
  'basic.mailing': 'yes',
  'initiate.relationship': 'mother',
  'initiate.documents': 'affadavit'
}



//exports.handler = async (event, context,callback) => {
exports.handler = function(event, context, callback) {
var body = ''
  if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body)


    body['basic.fname'] = "Fruity Bear"
    for (let [key, value] of Object.entries(body)) {
      console.log(`${key}: ${value}`);
    }



    console.log(flatten(body));
    console.log(typeof body)
  } else {
    body = null
    console.log('no luck dipshit')
  }

  // pdfFiller.fillForm( sourcePDF, data)
  //   .toFile('outputFile.PDF')
  //   .then(() => {
  //     // your file has been written
  //   }).catch((err) => {
  //   console.log(err);
  // });

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
  //exec('pdftk ./home/broeker/Projects/mlsa-calculator/outputFile.PDF dump_data_fields output DATA.txt', context.done);
 //console.log('fooker')
 // console.log(exec('pwd', context.done));
 //  console.log(exec('pdftk --version', context.done));
 //        callback(null, {
 //          statusCode: 200,
 //          body: 'foo',
 //        });

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