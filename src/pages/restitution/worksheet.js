import React, { useState } from "react"
import { Formiz, useForm } from "@formiz/core"
import { MultiStepsLayout } from "../../components/MultiStepsLayout"
import { TermsOfUse } from "../../components/Restitution/TermsOfUse"
import { PersonalInfo } from "../../components/Restitution/01-Start/Personalnfo"
import { CaseInfo } from "../../components/Restitution/01-Start/CaseInfo"
import { Funeral } from "../../components/Restitution/02-Funeral/Funeral"
import { MedicalExpenses } from "../../components/Restitution/03-MedicalExpenses/MedicalExpenses"
import { FirstResponderExpenses } from "../../components/Restitution/04-FirstResponderExpenses/FirstResponderExpenses"
import { SupplyExpenses } from "../../components/Restitution/04-FirstResponderExpenses/SupplyExpenses"
import { FutureExpenses } from "../../components/Restitution/05-FutureExpenses/FutureExpenses"
import { FutureExpensesRecurring } from "../../components/Restitution/06-FutureExpensesRecurring/FutureExpensesRecurring"
import { MentalHealth } from "../../components/Restitution/07-MentalHealth/MentalHealth"
import { MentalHealthFuture } from "../../components/Restitution/08-MentalHealthFuture/MentalHealthFuture"
import { PropertyStolen } from "../../components/Restitution/09-PropertyStolen/PropertyStolen"
import { PropertyStolenRecovered } from "../../components/Restitution/09-PropertyStolen/PropertyStolenRecovered"
import { PropertyStolenLost } from "../../components/Restitution/09-PropertyStolen/PropertyStolenLost"
import { PropertyDamage } from "../../components/Restitution/10-PropertyDamage/PropertyDamage"
import { LostWages } from "../../components/Restitution/11-LostWages/LostWages"
import { LostWagesCourt } from "../../components/Restitution/11-LostWages/LostWagesCourt"
import { LostWagesOther } from "../../components/Restitution/11-LostWages/LostWagesOther"
import { LostWagesFuture } from "../../components/Restitution/11-LostWages/LostWagesFuture"
import { LostWagesCarTravel } from "../../components/Restitution/11-LostWages/LostWagesCarTravel"
import { LostWagesOtherTravel } from "../../components/Restitution/11-LostWages/LostWagesOtherTravel"
import { Moving } from "../../components/Restitution/12-Moving/Moving"
import { Safety } from "../../components/Restitution/13-Safety/Safety"
import { Education } from "../../components/Restitution/14-Education/Education"
import { OtherExpenses } from "../../components/Restitution/15-OtherExpenses/OtherExpenses"
import { CompleteApp } from '../../components/Restitution/CompleteApp/CompleteApp'
import { Beforeunload } from 'react-beforeunload'
// import * as init from "../../../functions/pdf-gen/processors/init-restitution.json"

export default function Worksheet() {
  const form = useForm({ subscribe: false })
  const [appState, setAppState] = useState({
    loading: false,
    pdf: null,
    error: false,
  })

  const handleSubmit = values => {
    setAppState({ loading: true, pdf: null, error: false })
    const data = {
      app: 'restitution',
      formData: values
    }
    fetch("/.netlify/functions/pdf-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setAppState({ loading: false, pdf: data, error: false })
      })
      .catch(error => {
        setAppState({ loading: false, pdf: null, error: true })
      })
  }

  // Set default values from init.json
  // const values = init.default

  return (

    <Formiz connect={form} onValidSubmit={handleSubmit} 
        // initialValues={values}
      >
      <Beforeunload onBeforeunload={event => event.preventDefault()} />
      <MultiStepsLayout
        app="restitution"
        buttonTitle="Restitution Workbook"
        submitLabel="Finish"
      >
        <TermsOfUse />
        <PersonalInfo />
        <CaseInfo />
        <Funeral />
        <MedicalExpenses />
        <FirstResponderExpenses />
        <SupplyExpenses />
        <FutureExpenses />
        <FutureExpensesRecurring />
        <MentalHealth />
        <MentalHealthFuture />
        <PropertyStolen />
        <PropertyStolenRecovered />
        <PropertyStolenLost />
        <PropertyDamage />
        <LostWages />
        <LostWagesCourt />
        <LostWagesOther />
        <LostWagesFuture />
        <LostWagesCarTravel />
        <LostWagesOtherTravel />
        <Moving />
        <Safety />
        <Education />
        <OtherExpenses />
        <CompleteApp state={!appState.loading && !!appState.pdf} pdf={appState.pdf} />
      </MultiStepsLayout>
    </Formiz>
  )
}
