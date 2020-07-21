import React, { useState } from "react"
import theme from "../../theme"
import { PageHeader } from "../layout/PageHeader"
import printJS from "print-js"
import { useForm } from "@formiz/core"
import { MultiStepsLayout } from "../components/MultiStepsLayout"
import { PageLayout } from "../layout/PageLayout"
import { InitiateInterview } from "../components/01-InitiateInterview/IntiateInterview"
import { BasicInformation } from "../components/02-BasicInformation/BasicInformation"
import { OtherParent } from "../components/03-OtherParent/OtherParent"
import { EnterChildren} from '../components/04-EnterChildren/EnterChildren'
import { Beforeunload } from 'react-beforeunload';
import { StartOver } from "../components/100-startOver/StartOver"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box,
} from "@chakra-ui/core"
import { SectionWrapper } from "../components/SectionWrapper"
import { SectionHeader } from "../components/SectionHeader"

export default function Home() {
  //localStorage.clear()
  const form = useForm()
  const [isMontana, setIsMontana] = useState("")

  const updateMontana = value => {
    setIsMontana(value)
  }

  const [appState, setAppState] = useState({
    loading: false,
    pdf: null,
    complete: false,
    values: [],
  })

  const handlePrint = () => {
    const base64 = appState.pdf
    printJS({ printable: base64, type: "pdf", base64: true })
  }

  const handleBack = () => {
    setAppState({ complete: false })
  }

  const handleSubmit = values => {
    setAppState({ complete: true, values: values })
    const data = values
    fetch("/.netlify/functions/pdf-gen/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        //console.log('Data:', data);
        setAppState({
          complete: true,
          loading: false,
          pdf: data,
          values: values,
        })
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }
  return (
    <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        {isMontana === "no" ? (
          <PageLayout>
            <Box>You fail.</Box>
          </PageLayout>
        ) : appState.complete === false ? (
          <MultiStepsLayout
            form={form}
            onValidSubmit={handleSubmit}
            submitLabel="Create app"
            updateMontana={updateMontana}
            isMontana={isMontana}
          >
            <>
              <PageHeader githubPath="UseCase1/index.js">
                Child Support Calculator
              </PageHeader>
              <InitiateInterview updateMontana={updateMontana} />
              <BasicInformation />
              <OtherParent />
              <EnterChildren />
            </>
          </MultiStepsLayout>
        ) : (
          <PageLayout>
            {appState.pdf}
            <div>This app is finsihed.</div>
            <div>
              <button type="button" onClick={handleBack}>
                go back
              </button>
            </div>
          </PageLayout>
        )}
      </ColorModeProvider>
    </ThemeProvider>
    </Beforeunload>
  )
}

// <>
//   <PageHeader githubPath="UseCase1/index.js">Finished!</PageHeader>
//   <div>
//     <a
//       href={"data:application/pdf;base64," + appState.pdf + ""}
//       download="file.pdf"
//     >
//       Download me
//     </a>
//   </div>
//   <button type="button" onClick={handlePrint}>
//     Print PDF with Message
//   </button>
//   <button type="button">Send as email</button>
//   <button type="button" onClick={handleBack}>
//     Go back
//   </button>
// </>
//
// <>
//   <PageHeader githubPath="UseCase1/index.js">Sorry</PageHeader>
//   <StartOver updateMontana={updateMontana} />
// </>
