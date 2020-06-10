// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
var pdfFiller   = require('pdffiller-aws-lambda');
var sourcePDF = "test.pdf";
var destinationPDF =  "test_complete.pdf";
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
exports.handler = async (event, context) => {
  try {
    pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
      if (err) throw err;
      console.log("In callback (we're done).");
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
