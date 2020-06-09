// functions/pdf-gen/pdf-gen.js
'use strict';
const  pdfFiller = require('pdffiller-stream');
//import pdfFiller from 'pdffiller-stream';

const sourcePDF = "test.pdf";

//process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/bin';

//process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/bin';

// /var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin
// /var/task
// /var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib

// /var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin:/var/task/bin
// /var/task
// /var/task/bin

process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT + '/src/functions/pdf-gen/bin';
process.env.LD_LIBRARY_PATH = process.env.LAMBDA_TASK_ROOT + '/src/functions/pdf-gen/bin';

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


exports.handler = function(event, context, callback) {
  pdfFiller.fillForm( sourcePDF, data)
    .then((outputStream) => {
      console.log(outputStream)
      // use the outputStream here;
      // will be instance of stream.Readable
    }).catch((err) => {
    console.log(err);
  });
  // callback(null, {
  //   statusCode: 200,
  //   //body: process.env.PATH + "-" + process.env.LAMBDA_TASK_ROOT + '-' + process.env.LD_LIBRARY_PATH
  //   body: 'foo'
  // });
}
