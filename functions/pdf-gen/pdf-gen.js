// functions/pdf-gen/pdf-gen.js
'use strict';
var pdfFiller = require('pdffiller');
var exec = require('child_process').exec;

process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/bin';

process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/bin';



// exports.handler = function(event, context, callback) {
//   exec('pdftk --version', context.done);
// }

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: process.env.PATH
  });
}
