// functions/pdf-gen/pdf-gen.js
const  pdfFiller = require('pdffiller-stream');

const sourcePDF = "test.pdf";
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

  exports.handler = async function() {
  console.log('fooman')
    pdfFiller.fillForm( sourcePDF, data)
      .then((outputStream) => {
        console.log('i have a stream, yo.')
        console.log(outputStream)
        // use the outputStream here;
        // will be instance of stream.Readable
      }).catch((err) => {
      console.log(err);
    });
    return {
      statusCode: 200,
      body: "Hello world!",
    };
  }
