import React, { useState, useEffect } from "react";
import theme from '../../theme';
import { PageHeader } from '../components/PageHeader'
import { genPDF } from '../components/GenPDF/genPDF';
import { Link } from "gatsby"
import {
  ThemeProvider, ColorModeProvider, CSSReset, Box, Stack, Flex,
} from '@chakra-ui/core'
//import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import { Document, Page, pdfjs  } from 'react-pdf';
import myPdf from '../../static/sample.pdf'
const fs = require('fs');
const pdf2 = "/home/broeker/Projects/mlsa-calculator/static/sample.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
var Readable = require('stream').Readable
var {Base64Encode} = require('base64-stream');

export default function Pdf() {
  const [doc, setDoc] = React.useState({ })
  const [errors, setErrors] = React.useState(false)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [appState, setAppState] = useState({
    loading: false,
    pdf: null,
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  // const handler = () => {
  //   const res = fetch("/.netlify/functions/pdf-gen", { headers: { accept: "Accept: application/json" } })
  //     .then((x) => x.json())
  //     .then(({ msg }) => setPdf( pdf ))
  //   console.log(msg)
  // }
  // const MyDoc = () => (
  //
  //   <Document>
  //     <Page>Hello world.</Page>
  //
  //   </Document>
  //
  // )

  const myImage = ""
//   useEffect(() => {
//     fetch('/.netlify/functions/pdf-gen/')
//       .then(response => response)
//       .then(data => setDoc(data));
//   } , []);
//
// console.log(doc.body)

  useEffect(() => {
    setAppState({ loading: true });
    const pdf =`/.netlify/functions/pdf-gen/`;
    fetch(pdf)
      .then((res) => res.json())
      .then((file) => {
        setAppState({ loading: false, pdfBase64: file });
      });
  }, [setAppState]);
console.log(appState.pdfBase64)
  // useEffect(() => {
  //   async function fetchData() {
  //     // fetch('/.netlify/functions/pdf-gen/')
  //     //   .then(res => res.blob())
  //     //   .then(res => {
  //     //     const objectURL = URL.createObjectURL(res);
  //     //    console.log(objectURL)
  //     //   });
  //
  //
  //
  //   fetchData();
  //
  // }, []);


  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />

          <PageHeader githubPath="UseCase1/index.js">
            <div>PDF</div>
          </PageHeader>
        <div>
          {appState.pdfBase64}

          <div>
          <a href={"data:application/pdf;base64," + appState.pdfBase64 +""} download="file.pdf">Download me</a>
          </div>
          {/*<Document*/}
          {/*  file={`data:application/pdf;base64,${appState.pdfBase64}`}*/}
          {/*>*/}
          {/*  <Page pageNumber={1} />*/}
          {/*</Document>*/}

        </div>

      </ColorModeProvider>
    </ThemeProvider>
  );
};
