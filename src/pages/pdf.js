import React, { useState, useEffect } from "react";
import theme from '../../theme';
import { PageHeader } from '../components/PageHeader'
import { genPDF } from '../components/GenPDF/genPDF';
import {
  ThemeProvider, ColorModeProvider, CSSReset, Box, Stack, Flex,
} from '@chakra-ui/core'

export default function Pdf() {
  const [msg, setMsg] = React.useState("click the button")
  const handler = () =>
    fetch("/.netlify/functions/pdf-gen", { headers: { accept: "Accept: application/json" } })
      .then((x) => x.json())
      .then(({ msg }) => setMsg(msg))


  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("/.netlify/functions/joke/");
  //    // console.log(res)
  //     res
  //       .json()
  //       .then(res => setPlanets(res))
  //       .catch(err => setErrors(err));
  //   }
  //
  //   fetchData();
  // });
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />

          <PageHeader githubPath="UseCase1/index.js">
            <div>PDF</div>
          </PageHeader>
        <div className="App">
          <header className="App-header">
            <p>message: {msg}</p>
            <button onClick={handler}> click meeee</button>
          </header>
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
};
