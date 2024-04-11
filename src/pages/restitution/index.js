import React from "react"
import { Formiz } from "@formiz/core"
import { navigate } from "gatsby"
import { IntroHow } from "../../components/Restitution/00-intro/IntroHow"
import { IntroCanDo } from "../../components/Restitution/00-intro/IntroCanDo"
import { IntroCantDo } from "../../components/Restitution/00-intro/IntroCantDo"
import { IntroPrep } from "../../components/Restitution/00-intro/IntroPrep"
import { IntroLearnMore } from "../../components/Restitution/00-intro/IntroLearnMore"
import { IntroAdditional } from "../../components/Restitution/00-intro/IntroAdditional"
import { IntroSafety } from "../../components/Restitution/00-intro/IntroSafety"
import { IntroQuestions } from '../../components/Restitution/00-intro/IntroQuestions'
// import { IntroHelp } from "../../components/Restitution/00-intro/IntroHelp"
import { MultiStepsLayout } from "../../components/MultiStepsLayout"
// import { scrollToStepTop } from '../components/Utils/scroll'

export default function Restitution (Restitution) {
  const handleSubmit = () => {
    navigate("/restitution/worksheet")
  }
  return (
    <Formiz onValidSubmit={handleSubmit}>
      <MultiStepsLayout
        app="restitutionIntro"
        buttonTitle="Restitution Workbook"
        submitLabel="Finish"
      >

        <IntroHow />
        <IntroCanDo />
        <IntroCantDo />
        <IntroPrep />
        <IntroLearnMore />
        <IntroAdditional />
        <IntroSafety />
        <IntroQuestions />
        {/*<IntroHelp />*/}
      </MultiStepsLayout>
    </Formiz>
  )
}
