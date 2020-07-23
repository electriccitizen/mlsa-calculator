import React, { useState } from "react"
import theme from "../../theme"
import { PageHeader } from "../layout/PageHeader"
import printJS from "print-js"
import { useForm } from "@formiz/core"
import { MultiStepsLayout } from "../components/MultiStepsLayout"
import { PageLayout } from "../layout/PageLayout"
import { InitiateInterview } from "../components/01-InitiateInterview/IntiateInterview"
import { BasicInformation } from "../components/02-BasicInformation/BasicInformation"
import { End } from "../components/02-BasicInformation/End"
import { OtherParent } from "../components/03-OtherParent/OtherParent"
import { EnterChildren } from "../components/04-EnterChildren/EnterChildren"
import { OtherChildren } from "../components/05-OtherChildren/OtherChildren"
import { EnterMyOtherChildren } from "../components/05-OtherChildren/EnterMyOtherChildren"
import { OtherChildrenSecondary } from "../components/06-OtherChildrenSecondary/OtherChildrenSecondary"
import { EnterMyOtherChildrenSecondary } from "../components/06-OtherChildrenSecondary/EnterMyOtherChildrenSecondary"

import { Beforeunload } from "react-beforeunload"
import { StartOver } from "../components/100-startOver/StartOver"
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box,
  Button,
  SimpleGrid,
  Divider,
} from "@chakra-ui/core"
import { SectionWrapper } from "../components/SectionWrapper"
import { SectionHeader } from "../components/SectionHeader"
import { FieldInput } from "../components/Fields/FieldInput"

export default function Home() {
  //sessionStorage.clear()
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
              <Box>Sorry!</Box>
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
                <OtherChildren />
                <EnterMyOtherChildren />
                <OtherChildrenSecondary />
                <EnterMyOtherChildrenSecondary />
                <End />
              </>
            </MultiStepsLayout>
          ) : (
            <PageLayout>
              <PageHeader githubPath="UseCase1/index.js">Finished!</PageHeader>
              <Box mt={8} mb={8}>
                Your document(s) are now complete and can be downloaded,
                printed, or emailed by choosing from the options below. You may
                choose multiple options, and they will be available as long you
                keep this browser window open:
              </Box>

              <SimpleGrid columns={3} spacing={10}>
                <Button variantColor="brand" type="button">
                  <a
                    href={"data:application/pdf;base64," + appState.pdf + ""}
                    download="file.pdf"
                  >
                    Download
                  </a>
                </Button>
                <Box mb={8}>Download this document to your local computer</Box>
              </SimpleGrid>

              <SimpleGrid columns={3} spacing={10}>
                <Button
                  variantColor="brand"
                  type="button"
                  onClick={handlePrint}
                >
                  Print
                </Button>
                <Box mb={8}>Print a hard copy of this document.</Box>
              </SimpleGrid>

              <SimpleGrid columns={3} spacing={10}>
                <Button
                  variantColor="brand"
                  type="button"
                  onClick={handlePrint}
                >
                  Send via email
                </Button>
                <Box mb={8}>
                  Send a copy of the documents to your email address
                </Box>
              </SimpleGrid>

              <Divider />
              <SimpleGrid columns={3} spacing={10}>
                <Button variantColor="teal" type="button" onClick={handleBack}>
                  Go back and review
                </Button>
                <Box mb={8}>
                  If you need to make any changes, you can go back to the
                  beginning to review and update your data.
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={3} spacing={10}>
                <Button variantColor="red" type="button" onClick={handleBack}>
                 Finish!
                </Button>
                <Box mb={8}>
                 Once you have downloaded, printed, or sent your document click Finish to delete your data.
                </Box>
              </SimpleGrid>

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
