import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Formiz, useForm } from "@formiz/core"
import { Box, Grid, Button } from "@chakra-ui/core"
import { PageLayout } from "../layout/PageLayout"

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object,
  children: PropTypes.node,
  submitLabel: PropTypes.node,
}
const defaultProps = {
  form: null,
  children: "",
  submitLabel: "",
}

// const PersistForm = () => {
//   const form = useForm()
//   const [isLoaded, setIsLoaded] = React.useState(false)
//
//   React.useEffect(() => {
//     setTimeout(() => {
//       setIsLoaded(true)
//       const values =
//         JSON.parse(sessionStorage.getItem("formValues") || "") || {}
//       form.setFieldsValues(flatten(values))
//     })
//   }, [])
//
//   React.useEffect(() => {
//     if (isLoaded) {
//       sessionStorage.setItem("formValues", JSON.stringify(form.values))
//     }
//   }, [form.values, isLoaded])
//
//   return null
// }

export const MultiStepsLayout = ({
  children,
  submitLabel = "Submit",
  ...props
}) => {
  const form = useForm({ subscribe: "form" })
  const hasSteps = !!form.steps.length
  const isMontana = true
  const [isLoaded, setIsLoaded] = useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    })
  }, [])
  return (
    <Formiz connect={form} {...props}>
      {/*<PersistForm />*/}
      <PageLayout>
        {isLoaded ? (
          <form noValidate onSubmit={hasSteps ? form.submitStep : form.submit}>
            {children}
            {hasSteps && (
              <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
                {!form.isFirstStep && (
                  <Button gridColumn="1" onClick={form.prevStep}>
                    Previous
                  </Button>
                )}
                {isMontana !== "no" && (
                  <>
                    <Box
                      gridColumn="2"
                      textAlign="center"
                      fontSize="sm"
                      color="gray.500"
                    >
                      Step {form.currentStep.index + 1} / {form.steps.length}
                    </Box>
                    <Button
                      type="submit"
                      gridColumn="4"
                      colorScheme="brand"
                      isDisabled={
                        form.isFirstStep === true && form.isStepValid === false
                          ? // || sessionStorage.getItem("terms") === "no"
                            true
                          : (form.isLastStep
                              ? !form.isValid
                              : !form.isStepValid) && form.isStepSubmitted
                      }
                    >
                      {form.isLastStep ? submitLabel : "Next"}
                    </Button>
                  </>
                )}
              </Grid>
            )}
          </form>
        ) : (
          "sorry bro"
        )}
      </PageLayout>
    </Formiz>
  )
}

MultiStepsLayout.propTypes = propTypes
MultiStepsLayout.defaultProps = defaultProps
