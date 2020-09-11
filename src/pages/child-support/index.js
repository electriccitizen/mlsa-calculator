import React from "react"
import { CalculatorIntroLayout } from "../../components/CalculatorIntroLayout"
import { IntroWhat } from "../../components/ChildSupport/00-intro/IntroWhat"
import { IntroHow } from "../../components/ChildSupport/00-intro/IntroHow"
import { IntroLawyer } from "../../components/ChildSupport/00-intro/IntroLawyer"
import { IntroPrep } from "../../components/ChildSupport/00-intro/IntroPrep"
import { IntroAdditional } from "../../components/ChildSupport/00-intro/IntroAdditional"
import { IntroSafety } from "../../components/ChildSupport/00-intro/IntroSafety"
import { IntroCanDo } from '../../components/ChildSupport/00-intro/IntroCanDo'
import { IntroCantDo } from '../../components/ChildSupport/00-intro/IntroCantDo'
import { IntroHelp } from '../../components/ChildSupport/00-intro/IntroHelp'

export default function CalculatorIntro() {
  const windowGlobal = typeof window !== "undefined" && window
  const handleSubmit = () => {
    windowGlobal.location.href = "/child-support/calculator"
  }
  return (
    <>
      <CalculatorIntroLayout
        onValidSubmit={handleSubmit}
        submitLabel="Start the interview"
      >
        <>
          <IntroHow />
          <IntroWhat />
          <IntroCanDo />
          <IntroCantDo />
          <IntroPrep />
          <IntroLawyer />
          <IntroAdditional />
          <IntroSafety />
          <IntroHelp />
        </>
      </CalculatorIntroLayout>
    </>
  )
}
