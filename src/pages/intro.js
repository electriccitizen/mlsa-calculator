import React, { useState } from "react"
import { PageHeader } from "../layout/PageHeader"
import printJS from "print-js"
import { useForm } from "@formiz/core"
import { GuideLayout } from "../components/GuideLayout"
import { PageLayout } from "../layout/PageLayout"

import { IntroWhat } from "../components/00-intro/IntroWhat"

import { IntroHow } from "../components/00-intro/IntroHow"
import { IntroLawyer } from "../components/00-intro/IntroLawyer"
import { IntroPrep } from "../components/00-intro/IntroPrep"
import { IntroAdditional } from "../components/00-intro/IntroAdditional"
import { IntroSafety } from "../components/00-intro/IntroSafety"

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
import { MultiStepsLayout } from "../components/MultiStepsLayout"

export default function Calculator() {
  //sessionStorage.clear()
  const form = useForm()
  const [isMontana, setIsMontana] = useState("")
  const windowGlobal = typeof window !== 'undefined' && window
  const handleSubmit = values => {
    //windowGlobal.location.href = "/calculator"
  }
  return (
    <>
      <GuideLayout
        form={form}
        onValidSubmit={handleSubmit}
        submitLabel="Start the interview"
        isMontana={isMontana}
      >
        <>
          {/*<IntroCanDo />*/}
          {/*<IntroCantDo />*/}
          <IntroHow />
          <IntroWhat />
          <IntroPrep />

          <IntroLawyer />
          <IntroAdditional />
          <IntroSafety />
        </>
      </GuideLayout>
    </>
  )
}
