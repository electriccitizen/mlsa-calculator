import React, { useState } from "react"
import { PageHeader } from "../layout/PageHeader"
import printJS from "print-js"
import { useForm } from "@formiz/core"
import { MultiStepsLayout } from "../components/MultiStepsLayout"
import { PageLayout } from "../layout/PageLayout"
import { InitiateInterview } from "../components/01-InitiateInterview/IntiateInterview"
import { TermsOfUse } from "../components/01-InitiateInterview/TermsOfUse"
import { IntroCanDo } from "../components/01-InitiateInterview/IntroCanDo"
import { IntroCantDo } from "../components/01-InitiateInterview/IntroCantDo"
import { IntroHelp } from "../components/00-intro/IntroHelp"
import { BasicInformation } from "../components/02-BasicInformation/BasicInformation"
import { End } from "../components/02-BasicInformation/End"
import { OtherParent } from "../components/03-OtherParent/OtherParent"
import { EnterChildren } from "../components/04-EnterChildren/EnterChildren"
import { OtherChildren } from "../components/05-OtherChildren/OtherChildren"
import { EnterMyOtherChildren } from "../components/05-OtherChildren/EnterMyOtherChildren"
import { OtherChildrenSecondary } from "../components/06-OtherChildrenSecondary/OtherChildrenSecondary"
import { EnterMyOtherChildrenSecondary } from "../components/06-OtherChildrenSecondary/EnterMyOtherChildrenSecondary"
import { Dummy } from "../components/07-Dummy/Dummy"
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

export default function Calculator() {
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
  const isFirst = form.isFirstStep
  return (
    <>
      {isMontana === "nope" ? (
        <PageLayout>
          <Box>Sorry!</Box>
        </PageLayout>
      ) : appState.complete === false ? (
        <>
          <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
            <MultiStepsLayout
              form={form}
              onValidSubmit={handleSubmit}
              submitLabel="Prepare document(s)"
              updateMontana={updateMontana}
              isMontana={isMontana}
            >
              <>
                {/*<TermsOfUse />*/}
                {/*<IntroCanDo />*/}
                {/*<IntroCantDo />*/}
                {/*<IntroHelp />*/}
                {/*<InitiateInterview updateMontana={updateMontana} />*/}
                {/*<BasicInformation />*/}
                <OtherParent />
                <EnterChildren />
                <OtherChildren />
                <EnterMyOtherChildren />
                <OtherChildrenSecondary />
                <EnterMyOtherChildrenSecondary />
                {/*<Dummy />*/}
              </>
            </MultiStepsLayout>
          </Beforeunload>
        </>
      ) : (
        <PageLayout>
          <PageHeader githubPath="UseCase1/index.js">Your results</PageHeader>
          <Box mt={8} mb={8}>
            Your document(s) are now complete and can be downloaded, printed, or
            emailed. These options will be available as long as this browser
            window remains open.
          </Box>

          <SimpleGrid columns={3} spacing={10}>
            <Button colorScheme="brand" type="button">
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
            <Button colorScheme="brand" type="button" onClick={handlePrint}>
              Print
            </Button>
            <Box mb={8}>Print a hard copy of this document.</Box>
          </SimpleGrid>

          <SimpleGrid columns={3} spacing={10}>
            <Button colorScheme="brand" type="button" onClick={handlePrint}>
              Send via email
            </Button>
            <Box mb={8}>Send a copy of the documents to your email address</Box>
          </SimpleGrid>

          <Divider />
          <SimpleGrid columns={3} spacing={10}>
            <Button colorScheme="teal" type="button" onClick={handleBack}>
              Go back and review
            </Button>
            <Box textAlign="center"> - or - </Box>
            <Button colorScheme="red" type="button" onClick={handleBack}>
              Finish!
            </Button>
          </SimpleGrid>
          <SimpleGrid columns={3} spacing={10}>
            <Box mt="4">
              Go back to the beginning to review or to make any necessary
              changes.
            </Box>
            <Box textAlign="center"> </Box>
            <Box mt="4">
              Click finish to clear your data and exit the application.
            </Box>
          </SimpleGrid>
        </PageLayout>
      )}
    </>
  )
}
