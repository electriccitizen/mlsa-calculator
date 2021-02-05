import React, { useState } from "react"
import { Formiz, useForm } from "@formiz/core"
import * as init from './init.json'; 

import { TermsOfUse } from "../../components/ChildSupport/TermsOfUse"
import { InitiateInterview } from "../../components/ChildSupport/01-InitiateInterview/IntiateInterview"
import { BasicInformation } from "../../components/ChildSupport/02-BasicInformation/BasicInformation"
import { OtherParent } from "../../components/ChildSupport/03-OtherParent/OtherParent"
import { NumberChildren } from "../../components/ChildSupport/03-OtherParent/NumberChildren"
import { EnterChildren } from "../../components/ChildSupport/04-EnterChildren/EnterChildren"
import { OtherChildren } from "../../components/ChildSupport/05-OtherChildren/OtherChildren"
import { EnterMyOtherChildren } from "../../components/ChildSupport/05-OtherChildren/EnterMyOtherChildren"
import { OtherChildrenSecondary } from "../../components/ChildSupport/06-OtherChildrenSecondary/OtherChildrenSecondary"
import { EnterMyOtherChildrenSecondary } from "../../components/ChildSupport/06-OtherChildrenSecondary/EnterMyOtherChildrenSecondary"
import { Employment } from "../../components/ChildSupport/07-Employment/Employment"
import { CurrentJob } from "../../components/ChildSupport/08-CurrentJob/CurrentJob"
import { OtherJobs } from "../../components/ChildSupport/09-OtherJobs/OtherJobs"
import { EnterOtherJobs } from "../../components/ChildSupport/09-OtherJobs/EnterOtherJobs"
import { OtherIncome } from "../../components/ChildSupport/10-OtherIncome/OtherIncome"
import { ChildExpenses } from "../../components/ChildSupport/14-ChildExpenses/ChildExpenses"
import { AllowableDeductions } from "../../components/ChildSupport/15-AllowableDeductions/AllowableDeductions"
import { OtherAllowableDeductions } from "../../components/ChildSupport/15-AllowableDeductions/OtherAllowableDeductions"
import { TaxableIncome } from "../../components/ChildSupport/12-TaxableIncome/TaxableIncome"
import { NonTaxableIncome } from "../../components/ChildSupport/13-NonTaxableIncome/NonTaxableIncome"
import { StandardOfLiving } from "../../components/ChildSupport/16-StandardOfLiving/StandardOfLiving"
import { CurrentJobSecondary } from "../../components/ChildSupport/17-CurrentJobSecondary/CurrentJobSecondary"
import { EnterOtherJobsSecondary } from "../../components/ChildSupport/17-CurrentJobSecondary/EnterOtherJobsSecondary"
import { OtherIncomeSecondary } from "../../components/ChildSupport/18-OtherIncomeSecondary/OtherIncomeSecondary"
import { TaxableIncomeSecondary } from "../../components/ChildSupport/19-TaxableIncomeSecondary/TaxableIncomeSecondary"
import { NonTaxableIncomeSecondary } from "../../components/ChildSupport/20-NonTaxableIncomeSecondary/NonTaxableIncomeSecondary"
import { ChildExpensesSecondary } from "../../components/ChildSupport/21-ChildExpensesSecondary/ChildExpensesSecondary"
import { AllowableDeductionsSecondary } from "../../components/ChildSupport/22-AllowableDeductionsSecondary/AllowableDeductionsSecondary"
import { OtherAllowableDeductionsSecondary } from "../../components/ChildSupport/22-AllowableDeductionsSecondary/OtherAllowableDeductionsSecondary"
import { StandardOfLivingSecondary } from "../../components/ChildSupport/23-StandardOfLivingSecondary/StandardOfLivingSecondary"
import { ParentingDays } from "../../components/ChildSupport/24-ParentingDays/ParentingDays"
import { FinancialAffadavitOne } from "../../components/ChildSupport/25-FinancialAffadavitOne/FinancialAffadavitOne"
import { Schools } from "../../components/ChildSupport/26-Schools/Schools"
import { OtherSchools } from "../../components/ChildSupport/26-Schools/OtherSchools"
import { HealthInsurance } from "../../components/ChildSupport/27-HealthInsurance/HealthInsurance"
import { HealthInsurancePolicies } from "../../components/ChildSupport/27-HealthInsurance/HealthInsurancePolicies"
import { FinancialAffadavitTwo } from "../../components/ChildSupport/28-FinancialAffadavitTwo/FinancialAffadavitTwo"
import { FinancialAffadavitThree } from "../../components/ChildSupport/29-FinancialAffadavitThree/FinancialAffadavitThree"
import { CompleteApp } from "../../components/ChildSupport/CompleteApp/CompleteApp"
import { MultiStepsLayout } from "../../components/MultiStepsLayout"
import { RulesProvider } from "../../hooks/useRulesContext"
import { Beforeunload } from "react-beforeunload"

export default function Calculator() {
  const form = useForm({ subscribe: { fields: ["Documents"] } })
  const [appState, setAppState] = useState({
    loading: false,
    pdf: null,
    complete: false,
    values: [],
  })

  const handleSubmit = values => {
    console.log('i am valid')
    setAppState({ complete: false, values: values })
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

  const documents = form.values.Documents ? form.values.Documents : ""

  const values = init.default

  return (
    <>
      <Beforeunload onBeforeunload={event => event.preventDefault()} />
      <Formiz connect={form} onSubmit={handleSubmit} 
      initialValues={ values }
      > 
        <MultiStepsLayout
          app="support"
          buttonTitle="Child Support Calculator"
          submitLabel={
            documents === "both" ? "Generate documents" : "Generate document"
          }
        >
          <RulesProvider>
            <TermsOfUse />
            <InitiateInterview />
            <BasicInformation />
            <OtherParent />
            <NumberChildren />
            <EnterChildren />
            <OtherChildren />
            <EnterMyOtherChildren />
            {(documents === "both" || documents === "worksheets") && (
              <>
                <OtherChildrenSecondary />
                <EnterMyOtherChildrenSecondary />
              </>
            )}
            <Employment />
            <CurrentJob />
            <OtherJobs />
            <EnterOtherJobs />
            <OtherIncome />
            <TaxableIncome />
            <NonTaxableIncome />
            <ChildExpenses />
            <AllowableDeductions />
            <OtherAllowableDeductions />
            <StandardOfLiving />
            {(documents === "both" || documents === "worksheets") && (
              <>
                <CurrentJobSecondary />
                <EnterOtherJobsSecondary />
                <OtherIncomeSecondary />
                <TaxableIncomeSecondary />
                <NonTaxableIncomeSecondary />
                <ChildExpensesSecondary />
                <AllowableDeductionsSecondary />
                <OtherAllowableDeductionsSecondary />
                <StandardOfLivingSecondary />
              </>
            )}
            <ParentingDays />
            {(documents === "both" || documents === "affadavit") && (
              <>
                {/* <FinancialAffadavitOne />
                <Schools />
                <OtherSchools />
                <HealthInsurance />
                <HealthInsurancePolicies />
                <FinancialAffadavitTwo />
                <FinancialAffadavitThree /> */}
              </>
            )}
            <CompleteApp state={appState.complete} pdf={appState.pdf} />
          </RulesProvider>
        </MultiStepsLayout>
      </Formiz>
    </>
  )
}
