// functions/pdf-gen/pdf-gen.js
const  pdfFiller = require('pdffiller-stream');
//import pdfFiller from 'pdffiller-stream';
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
    const sourcePDF = "test.pdf";
    const FDFData = await pdfFiller.generateFDFTemplate(sourcePDF);
    return { FDFData };
    // console.log('fooman2')
  //   pdfFiller.fillForm( sourcePDF, data)
  //     .then((outputStream) => {
  //       console.log('i have a stream, yo.')
  //       // use the outputStream here;
  //       // will be instance of stream.Readable
  //     }).catch((err) => {
  //     console.log(err);
  //   });
    return {
      statusCode: 200,
      body: "Hello world!",
    };
  }
