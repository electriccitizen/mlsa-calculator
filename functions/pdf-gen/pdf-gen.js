// functions/pdf-gen/pdf-gen.js
'use strict';
var pdfFiller = require('pdffiller');
var exec = require('child_process').exec;

//process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/bin';

//process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/bin';

// /var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin
// /var/task
// /var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib


process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/bin';

process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/bin';



// exports.handler = function(event, context, callback) {
//   exec('pdftk --version', context.done);
// }

exports.handler = function(event, context, callback) {
  exec('pdftk --version', context.done);
  callback(null, {
    statusCode: 200,
    body: process.env.PATH + "-" + process.env.LAMBDA_TASK_ROOT + '-' + process.env.LD_LIBRARY_PATH
  });
}
