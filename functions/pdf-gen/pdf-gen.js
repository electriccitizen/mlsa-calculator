'use strict';

var spawn = require('child_process').spawn;

// Set the PATH and LD_LIBRARY_PATH environment variables.
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + '/bin';
process.env['LD_LIBRARY_PATH'] = process.env['LAMBDA_TASK_ROOT'] + '/bin';

exports.handler = function (event, context,callback) {
  console.log(spawn('pdftk --version', context.done));
  callback(null, {
    statusCode: 200,
    //body: process.env.PATH + "-" + process.env.LAMBDA_TASK_ROOT + '-' + process.env.LD_LIBRARY_PATH
    body: 'foo'
  });
};