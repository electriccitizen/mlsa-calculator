import React, { useState } from 'react';
import {PDFDownloadLink, Document, Page } from 'react-pdf';
//import { PDFDownloadLink, Document } from 'react-pdf/dist/esm/entry.webpack';
import myPdf from '../../static/sample.pdf'
export default function Simple() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdf = myPdf
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const MyDoc = () => (

    <Document file={pdf} />

  )


  return (
    <div>
      <a href={pdf} download>Download</a>
      {/*<PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">*/}
      {/*  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}*/}
      {/*</PDFDownloadLink>*/}
    </div>
  );
}