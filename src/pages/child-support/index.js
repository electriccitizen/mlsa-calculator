import React from "react"
import {useEffect} from "react";
import { Formiz } from "@formiz/core"
import { navigate } from "gatsby"
import { IntroWhat } from "../../components/ChildSupport/00-intro/IntroWhat"
import { IntroHow } from "../../components/ChildSupport/00-intro/IntroHow"
import { IntroLawyer } from "../../components/ChildSupport/00-intro/IntroLawyer"
import { IntroPrep } from "../../components/ChildSupport/00-intro/IntroPrep"
import { IntroAdditional } from "../../components/ChildSupport/00-intro/IntroAdditional"
import { IntroSafety } from "../../components/ChildSupport/00-intro/IntroSafety"
import { IntroCanDo } from "../../components/ChildSupport/00-intro/IntroCanDo"
import { IntroCantDo } from "../../components/ChildSupport/00-intro/IntroCantDo"
import { IntroHelp } from "../../components/ChildSupport/00-intro/IntroHelp"
import { MultiStepsLayout } from "../../components/MultiStepsLayout"

export default function CalculatorIntro() {
  const handleSubmit = () => {
    navigate("/child-support/calculator")
  }
  useEffect(() => {
    window.history.scrollRestoration = 'manual';}, []);
  return (
    <Formiz onValidSubmit={handleSubmit}>
      <MultiStepsLayout
        app="supportIntro"
        buttonTitle="Child Support Calculator"
        submitLabel="Finish"
      >
        <IntroHow />
        <IntroWhat />
        <IntroCanDo />
        <IntroCantDo />
        <IntroPrep />
        <IntroLawyer />
        <IntroAdditional />
        <IntroSafety />
        <IntroHelp />
      </MultiStepsLayout>
    </Formiz>
  )
}
