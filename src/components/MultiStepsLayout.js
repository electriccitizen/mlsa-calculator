import React, {useRef} from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useForm } from "@formiz/core"
import { PageLayout } from "../layout/PageLayout"
import { Box, Grid, Button, Stack } from "@chakra-ui/react"
import { CustomDrawer } from "./Utils/CustomDrawer"
import { navigate } from "gatsby"
import {useEffect} from "react";

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
export const MultiStepsLayout = ({
  children,
  submitLabel = "Submit",
  app,
  buttonTitle,
  ...props
}) => {


  const form = useForm({ subscribe: { form: true, fields: ["TermsOfUse"] } })
  const hasSteps = !!form.steps.length
  const handleExit = (dest) => {
    navigate(dest)
  }
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log("fooman")
  //
  // },[myRef]);
  const goBack = () => {
    form.prevStep()
    var el =   document.getElementById("page-wrap")
    el.scrollIntoView(true);
    document.getElementById("page-wrap").scrollTop -= 150;
    // document.getElementById('page-wrap').scrollIntoView(alignToTop)
  }


  const useSubmitStep = async (e) => {
    e.preventDefault()
    form.submitStep()
    var el =   document.getElementById("page-wrap")
    el.scrollIntoView(true);
    document.getElementById("page-wrap").scrollTop -= 150;
  }


  return (
    <PageLayout  {...props}>
      <form  noValidate onSubmit={hasSteps ? useSubmitStep : form.submit}>
        <Stack w="100%" direction={["column", "row"]}>
          <Box width="100%" align="right" flex={1}>
            <CustomDrawer app={app} buttonTitle={buttonTitle} />
          </Box>
          {/*<div ref={fieldRef}>scroll target</div>*/}
        </Stack>
        {children}

        {hasSteps && (
          <Grid mt={8} templateColumns="1fr 2fr 1fr" alignItems="center">
            {!form.isFirstStep && (
              <Button gridColumn="1" onClick={goBack}>
                Previous
              </Button>
            )}
            <Box
              gridColumn="2"
              textAlign="center"
              fontSize="sm"
              color="gray.500"
            >
              Step {form.currentStep.index + 1} / {form.steps.length}
            </Box>
            {!form.isLastStep &&
            <Button
              type="submit"
              gridColumn="3"
              colorScheme="brand"
              isDisabled={
                app === "support" &&
                form.values &&
                form.values.TermsOfUse !== "yes"
                  ? true
                  : (form.isLastStep ? !form.isValid : !form.isStepValid) &&
                  form.isStepSubmitted
              }
            >
              {form.isLastStep ? submitLabel : "Next"}
            </Button>
            }
            {form.isLastStep && app === "support" && (
              <Box
                gridColumn="3"
                textAlign="right"
                fontSize="sm"
                color="gray.500"
                mt={2}
              >
                <Button colorScheme={"red"} onClick={() => handleExit("/")}>Exit interview</Button>
              </Box>
            )}
            {form.isLastStep && app === "supportIntro" && (
              <Box
                gridColumn="3"
                textAlign="right"
                fontSize="sm"
                color="gray.500"
                mt={2}
              >
                <Button colorScheme={"brand"} onClick={() => handleExit("/child-support/calculator")}>Start interview</Button>
              </Box>
            )}
            {form.isLastStep && app === "restitutionIntro" && (
              <Box
                gridColumn="3"
                textAlign="right"
                fontSize="sm"
                color="gray.500"
                mt={2}
              >
                <Button colorScheme={"brand"} onClick={() => handleExit("/restitution/worksheet")}>Start interview</Button>
              </Box>
            )}
          </Grid>
        )}
        {app === "supportIntro" && (
          <Box mt="8" fontSize={"md"} align={"center"}>
            If you have used this tool before, you can{" "}
            <Link to={"/child-support/calculator"}>skip to the start</Link>.
          </Box>
        )}
        {app === "restitutionIntro" && (
          <Box mt="8" fontSize={"md"} align={"center"}>
            If you have used this tool before, you can{" "}
            <Link to={"/restitution/worksheet"}>skip to the start</Link>.
          </Box>
        )}
      </form>
    </PageLayout>
  )
}

MultiStepsLayout.propTypes = propTypes
MultiStepsLayout.defaultProps = defaultProps
