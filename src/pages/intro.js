import React from "react"
import { GuideLayout } from "../components/GuideLayout"
import { IntroWhat } from "../components/00-intro/IntroWhat"
import { IntroHow } from "../components/00-intro/IntroHow"
import { IntroLawyer } from "../components/00-intro/IntroLawyer"
import { IntroPrep } from "../components/00-intro/IntroPrep"
import { IntroAdditional } from "../components/00-intro/IntroAdditional"
import { IntroSafety } from "../components/00-intro/IntroSafety"

export default function Calculator() {
  const windowGlobal = typeof window !== 'undefined' && window
  const handleSubmit = values => {
    windowGlobal.location.href = "/calculator"
  }
  return (
    <>
      <GuideLayout
        onValidSubmit={handleSubmit}
        submitLabel="Start the interview"
      >
        <>
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
