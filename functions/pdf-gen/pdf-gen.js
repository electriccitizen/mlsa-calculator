// functions/pdf-gen/pdf-gen.js
var pdfFiller = require('pdffiller');


xports.handler = function(event, context, callback) {
  var data = {
    "last_name" : "John",
    "first_name" : "Doe",
    "date" : "Jan 1, 2013",
    "football" : "Off",
    "baseball" : "Yes",
    "basketball" : "Off",
    "hockey" : "Yes",
    "nascar" : "Off"
  };

  var sourcePDF = "test.pdf";
  const FDFData = pdfFiller.generateFDFTemplate(sourcePDF);
  console.log(FDFData)
  callback(null, {
    statusCode: 200,
    body: "Hello, World you did good."

  });
}
