import React, { useState } from "react"
import { PageHeader } from "../../layout/PageHeader"
import { useForm } from "@formiz/core"
import { RestitutionIntroLayout } from "../../components/RestitutionIntroLayout"
import { PageLayout } from "../../layout/PageLayout"

import { TermsOfUse } from "../../components/Restitution/TermsOfUse"
import { IntroHow} from '../../components/Restitution/00-intro/IntroHow'
import { IntroCanDo} from '../../components/Restitution/00-intro/IntroCanDo'
import { IntroCantDo} from '../../components/Restitution/00-intro/IntroCantDo'
import { IntroPrep} from '../../components/Restitution/00-intro/IntroPrep'
import { IntroCode } from '../../components/Restitution/00-intro/IntroCode'
import { IntroAdditional} from '../../components/Restitution/00-intro/IntroAdditional'
import { IntroSafety} from '../../components/Restitution/00-intro/IntroSafety'
import { IntroHelp} from '../../components/Restitution/00-intro/IntroHelp'

//import { Beforeunload } from "react-beforeunload"
import {
  Box,
  Button,
  SimpleGrid,
  Divider,
  Heading,
  Icon,
} from "@chakra-ui/core"
import { FaFileAlt, FaFileInvoiceDollar } from "react-icons/fa"

export default function (Restitution) {
  const form = useForm()

  const [appState, setAppState] = useState({
    loading: false,
    pdf: null,
    complete: false,
    values: [],
  })
  const windowGlobal = typeof window !== "undefined" && window
  const handleSubmit = () => {
    windowGlobal.location.href = "/restitution/worksheet"
  }
  return appState.complete === false ? (
    <RestitutionIntroLayout
      form={form}
      onValidSubmit={handleSubmit}
      submitLabel="Start worksheet"
    >
      <>
        <IntroHow />
        <IntroCanDo />
        <IntroCantDo />
        <IntroPrep />
        <IntroCode />
        <IntroAdditional />
        <IntroSafety />
        <IntroHelp />
      </>
    </RestitutionIntroLayout>
  ) : (
    ""
  )
}
