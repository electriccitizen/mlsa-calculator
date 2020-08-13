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
  Box,
  Button,
  SimpleGrid,
  Divider,
} from "@chakra-ui/core"
import { SectionWrapper } from "../components/SectionWrapper"
import { SectionHeader } from "../components/SectionHeader"
import { FieldInput } from "../components/Fields/FieldInput"

export default function Safety() {
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
            <PageLayout>
           <h1>Safety</h1>
            </PageLayout>
          )}
        </ColorModeProvider>
      </ThemeProvider>
  )
}
