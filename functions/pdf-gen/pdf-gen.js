'use strict';
const  pdfFiller = require('pdffiller-stream');
const sourcePDF = "./src/test.pdf";
var exec = require('child_process').exec;
// Set the PATH and LD_LIBRARY_PATH environment variables.
// process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
// process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';
//process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/src/functions/pdf-gen/bin';
//process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/src/functions/pdf-gen/bin';

// PATH: /var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin
// LAMBDA_TASK_ROOT: /var/task
// LD_LIBRARY_PATH: /var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib
// PWD: /var/task

// NEW PATH /var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin:/var/task/src/functions/pdf-gen/bin
// NEW LD /var/task/src/functions/pdf-gen/bin

process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/src/bin';
process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/src/bin'
const data = {
  "last_name" : "John",
  "first_name" : "Doe",
  "date" : "Jan 1, 2013",
  "football" : "Off",
  "baseball" : "Yes",
  "basketball" : "Off",
  "hockey" : "Yes",
  "nascar" : "Off"
};
exports.handler = function (event, context,callback) {
  //console.log(exec('pdftk --version', context.done));
  //console.log(process.env.PATH + '--' + process.env.LAMBDA_TASK_ROOT + '--' + process.env.LD_LIBRARY_PATH)

  pdfFiller.fillForm( sourcePDF, data)
    .then((outputStream) => {
      console.log('i am a happy little stream')
      callback(null, {
        statusCode: 200,
        headers: {'Content-type' : 'application/pdf'},
        body: outputStream.toString('base64'),
        isBase64Encoded : true,
      });
      // use the outputStream here;
      // will be instance of stream.Readable
    }).catch((err) => {
    console.log(err);
  });



};