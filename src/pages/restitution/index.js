import React from "react"
import { Formiz } from "@formiz/core"
import { navigate } from "gatsby"
import { IntroHow } from "../../components/Restitution/00-intro/IntroHow"
import { IntroCanDo } from "../../components/Restitution/00-intro/IntroCanDo"
import { IntroCantDo } from "../../components/Restitution/00-intro/IntroCantDo"
import { IntroPrep } from "../../components/Restitution/00-intro/IntroPrep"
import { IntroCode } from "../../components/Restitution/00-intro/IntroCode"
import { IntroAdditional } from "../../components/Restitution/00-intro/IntroAdditional"
import { IntroSafety } from "../../components/Restitution/00-intro/IntroSafety"
import { IntroHelp } from "../../components/Restitution/00-intro/IntroHelp"
import { MultiStepsLayout } from "../../components/MultiStepsLayout"

export default function (Restitution) {
  const handleSubmit = () => {
    navigate("/restitution/worksheet")
  }
  return (
    <Formiz onValidSubmit={handleSubmit}>
      <MultiStepsLayout
        app="restitutionIntro"
        buttonTitle="Restitution Worksheet"
        submitLabel="Finish"
      >
        <IntroHow />
        {/*<IntroCanDo />*/}
        {/*<IntroCantDo />*/}
        {/*<IntroPrep />*/}
        <IntroCode />
        {/*<IntroAdditional />*/}
        <IntroSafety />
        <IntroHelp />
      </MultiStepsLayout>
    </Formiz>
  )
}
