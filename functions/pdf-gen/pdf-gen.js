'use strict';

var exec = require('child_process').exec;

// Set the PATH and LD_LIBRARY_PATH environment variables.
// process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
// process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';
//process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/src/functions/pdf-gen/bin';
//process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/src/functions/pdf-gen/bin';

exports.handler = function (event, context,callback) {
  //console.log(exec('pdftk --version', context.done));
  console.log(process.env.PATH + '--' + process.env.LAMBDA_TASK_ROOT + '--' + process.env.LD_LIBRARY_PATH)
  exec("pwd", (error, stdout, stderr) => {
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
    //body: process.env.PATH + "-" + process.env.LAMBDA_TASK_ROOT + '-' + process.env.LD_LIBRARY_PATH
    body: 'foo'
  });
};