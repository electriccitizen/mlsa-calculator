import React, { useState } from "react"
import { PageHeader } from "../layout/PageHeader"
import printJS from "print-js"
import { useForm } from "@formiz/core"
import { MultiStepsLayout } from "../components/MultiStepsLayout"
import { PageLayout } from "../layout/PageLayout"
import { InitiateInterview } from "../components/01-InitiateInterview/IntiateInterview"
import { TermsOfUse } from "../components/01-InitiateInterview/TermsOfUse"
import { IntroCanDo } from "../components/01-InitiateInterview/IntroCanDo"
import { IntroCantDo } from "../components/01-InitiateInterview/IntroCantDo"
import { IntroHelp } from "../components/00-intro/IntroHelp"
import { BasicInformation } from "../components/02-BasicInformation/BasicInformation"
import { End } from "../components/02-BasicInformation/End"
import { OtherParent } from "../components/03-OtherParent/OtherParent"
import { EnterChildren } from "../components/04-EnterChildren/EnterChildren"
import { OtherChildren } from "../components/05-OtherChildren/OtherChildren"
import { EnterMyOtherChildren } from "../components/05-OtherChildren/EnterMyOtherChildren"
import { OtherChildrenSecondary } from "../components/06-OtherChildrenSecondary/OtherChildrenSecondary"
import { EnterMyOtherChildrenSecondary } from "../components/06-OtherChildrenSecondary/EnterMyOtherChildrenSecondary"
import { Employment } from "../components/07-Employment/Employment"
import { CurrentJob } from "../components/08-CurrentJob/CurrentJob"
import { OtherJobs } from "../components/09-OtherJobs/OtherJobs"
import { EnterOtherJobs } from "../components/09-OtherJobs/EnterOtherJobs"
import { OtherIncome } from "../components/10-OtherIncome/OtherIncome"
import { ChildExpenses } from "../components/14-ChildExpenses/ChildExpenses"
import { TaxableIncome } from "../components/12-TaxableIncome/TaxableIncome"
import { NonTaxableIncome } from "../components/13-NonTaxableIncome/NonTaxableIncome"
import { AllowableDeductions } from "../components/15-AllowableDeductions/AllowableDeductions"
import { OtherAllowableDeductions } from "../components/15-AllowableDeductions/OtherAllowableDeductions"
import { StandardOfLiving } from "../components/16-StandardOfLiving/StandardOfLiving"
import { CurrentJobSecondary } from "../components/17-CurrentJobSecondary/CurrentJobSecondary"
import { EnterOtherJobsSecondary } from "../components/17-CurrentJobSecondary/EnterOtherJobsSecondary"
import { OtherIncomeSecondary } from "../components/18-OtherIncomeSecondary/OtherIncomeSecondary"
import { TaxableIncomeSecondary } from "../components/19-TaxableIncomeSecondary/TaxableIncomeSecondary"
import { NonTaxableIncomeSecondary } from "../components/20-NonTaxableIncomeSecondary/NonTaxableIncomeSecondary"
import { ChildExpensesSecondary } from "../components/21-ChildExpensesSecondary/ChildExpensesSecondary"
import { AllowableDeductionsSecondary } from "../components/22-AllowableDeductionsSecondary/AllowableDeductionsSecondary"
import { OtherAllowableDeductionsSecondary } from "../components/22-AllowableDeductionsSecondary/OtherAllowableDeductionsSecondary"
import { StandardOfLivingSecondary } from "../components/23-StandardOfLivingSecondary/StandardOfLivingSecondary"
import { ParentingDays } from "../components/24-ParentingDays/ParentingDays"
import { FinancialAffadavitOne } from "../components/25-FinancialAffadavitOne/FinancialAffadavitOne"
import { Schools } from "../components/26-Schools/Schools"
import { OtherSchools } from "../components/26-Schools/OtherSchools"
import { HealthInsurance } from "../components/27-HealthInsurance/HealthInsurance"
import { HealthInsurancePolicies } from "../components/27-HealthInsurance/HealthInsurancePolicies"
import { FinancialAffadavitTwo } from "../components/28-FinancialAffadavitTwo/FinancialAffadavitTwo"
import { FinancialAffadavitThree } from "../components/29-FinancialAffadavitThree/FinancialAffadavitThree"
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
  Heading,
  Icon,
} from "@chakra-ui/core"
import {
  FaFileAlt,
  FaFileInvoiceDollar,
  FaExternalLinkAlt,
} from "react-icons/fa"

export default function Calculator() {
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
  //const isFirst = form.isFirstStep
  return (
    <>
      {isMontana === "nope" ? (
        <PageLayout>
          <Box>Sorry!</Box>
        </PageLayout>
      ) : appState.complete === false ? (
        <>
          <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
            <MultiStepsLayout
              form={form}
              onValidSubmit={handleSubmit}
              submitLabel="Prepare document(s)"
              updateMontana={updateMontana}
              isMontana={isMontana}
            >
              <>
                <TermsOfUse />
                <IntroCanDo />
                <IntroCantDo />
                <IntroHelp />
                <InitiateInterview updateMontana={updateMontana} />
                <BasicInformation />
                <OtherParent />
                <EnterChildren />
                <OtherChildren />
                <EnterMyOtherChildren />
                <OtherChildrenSecondary />
                <EnterMyOtherChildrenSecondary />
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
                <CurrentJobSecondary />
                <EnterOtherJobsSecondary />
                <OtherIncomeSecondary />
                <TaxableIncomeSecondary />
                <NonTaxableIncomeSecondary />
                <ChildExpensesSecondary />
                <AllowableDeductionsSecondary />
                <OtherAllowableDeductionsSecondary />
                <StandardOfLivingSecondary />
                <ParentingDays />
                <FinancialAffadavitOne />
                <Schools />
                <OtherSchools />
                <HealthInsurance />
                <HealthInsurancePolicies />
                <FinancialAffadavitTwo />
                <FinancialAffadavitThree />
              </>
            </MultiStepsLayout>
          </Beforeunload>
        </>
      ) : (
        <PageLayout>
          <PageHeader githubPath="UseCase1/index.js">Your results!</PageHeader>
          <Box mt={8} mb={8}>
            Your document(s) are now complete and can be downloaded, printed, or
            emailed. These options will be available as long as this browser
            window remains open.
          </Box>
          <Box mb="8" display={{ md: "flex" }}>
            <Box flex={1}>
              <Heading
                as="h2"
                fontSize="2xl"
                lineHeight="tall"
                fontWeight="normal"
                color={"gray.500"}
                href="#"
                mb={2}
              >
                <Icon boxSize={12} color={"brand.400"} as={FaFileAlt} /> Child
                Support Worksheet
              </Heading>
              <Box fontSize="md" mb={4}>
                Your completed Child Support Worksheet is now available for
                download or printing.
              </Box>
              <Button mb="2" colorScheme="brand" type="button">
                <a
                  href={"data:application/pdf;base64," + appState.pdf + ""}
                  download="file.pdf"
                >
                  Download
                </a>
              </Button>
              <br />
              <Button colorScheme="brand" type="button" onClick={handlePrint}>
                Print
              </Button>
            </Box>
            <Box flex={1}>
              <Heading
                as="h2"
                fontSize="2xl"
                lineHeight="tall"
                fontWeight="normal"
                color={"gray.500"}
                href="#"
                mb={2}
              >
                <Icon
                  boxSize={12}
                  color={"brand.400"}
                  as={FaFileInvoiceDollar}
                />{" "}
                Financial Affadavit
              </Heading>
              <Box fontSize="md" mb={4}>
                Your completed Financial Affadavit is now available for
                download or printing.
              </Box>
              <Button mb="2" colorScheme="brand" type="button">
                <a
                  href={"data:application/pdf;base64," + appState.pdf + ""}
                  download="file.pdf"
                >
                  Download
                </a>
              </Button> <br />
              <Button colorScheme="brand" type="button" onClick={handlePrint}>
                Print
              </Button>
            </Box>
          </Box>



          <Divider />

          <Box  mt="8"  mb={8}>
            Thank you for using the Montana Child
            Support Calculator. If necessary, you
            can go back to review and edit your responses.
          </Box>

          <SimpleGrid columns={3} spacing={10}>
            <Button color='brand.500' type="button" onClick={handleBack}>
              Go back and review
            </Button>
            <Box textAlign="center"> - or - </Box>
            <Button color='brand.500' type="button" onClick={handleBack}>
              Finish!
            </Button>
          </SimpleGrid>
        </PageLayout>
      )}
    </>
  )
}
