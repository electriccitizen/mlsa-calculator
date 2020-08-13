import React, { useState } from "react"
import { Link } from "gatsby"
import theme from "../../theme"
import { PageHeader } from "../layout/PageHeader"
import printJS from "print-js"
import { useForm } from "@formiz/core"
import { PageLayout } from "../layout/PageLayout"

import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  GlobalStyles,
  Heading,
  Box,
  Button,
  Text,
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
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <GlobalStyles />
        <PageLayout>
          <Heading as="h2" size="xl">
            WHAT THIS TOOL CAN DO:
          </Heading>
          <Text fontSize="lg">In love with React & Next</Text>
          <Text fontSize="lg">The Montana Child Support Calculator was developed by the Montana
            Legal Services Association to help determine child support costs for
            those involved in, or considering divorce, child custody, or
            parenting plan actions.</Text>
          <p>

          </p>
          <p>This calculator will calculate child support for inclusion in:</p>
          <p>
            - a petition for a dissolution with children in District Court in
            Montana. - a petition for a parenting plan in District Court in
            Montana. - a modification of a child support order that was made in
            a dissolution with children or parenting plan by a District Court in
            Montana.
          </p>
          <h2>WHAT THIS TOOL CANNOT DO:</h2>• This calculator cannot take the
          place of a lawyer’s legal advice or information from the State of
          Montana Child Support Enforcement Division (CSED). • This calculator
          may not be right for you if you have a complicated case. • There is no
          claim or guarantee that using the calculator will help you get what
          you want. Montana Legal Services Association and/or CSED are not
          responsible for what happens if you use this calculator.
          <Button>
            <Link to="/calculator">Get started</Link>
          </Button>
        </PageLayout>
        )}
      </ColorModeProvider>
    </ThemeProvider>
  )
}
