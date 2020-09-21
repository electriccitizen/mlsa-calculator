import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useForm } from '@formiz/core'
import { PageLayout } from "../layout/PageLayout"
import { Box, Grid, Button, Stack } from "@chakra-ui/core"
import { CustomDrawer } from "./Utils/CustomDrawer"

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
  const form = useForm({ subscribe: "form" })
  const hasSteps = !!form.steps.length
  return (
    <PageLayout {...props}>
      <form noValidate onSubmit={hasSteps ? form.submitStep : form.submit}>
        <Stack w="100%" direction={["column", "row"]}>
          <Box width="100%" align="right" flex={1}>
            <CustomDrawer app={app} buttonTitle={buttonTitle} />
          </Box>
        </Stack>
        {children}

        {hasSteps && (
          <Grid mt={8} templateColumns="1fr 2fr 1fr" alignItems="center">
            {!form.isFirstStep && (
              <Button gridColumn="1" onClick={form.prevStep}>
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
            <Button
              type="submit"
              gridColumn="3"
              colorScheme="brand"
              isDisabled={
                (form.isLastStep ? !form.isValid : !form.isStepValid) &&
                form.isStepSubmitted
              }
            >
              {form.isLastStep ? submitLabel : "Next"}
            </Button>

          </Grid>

        )}
        {app === "supportIntro" &&
        <Box mt="8" fontSize={"md"} align={"center"}>
          If you have used this tool before, you can <Link to={"/child-support/calculator"}>skip to the start</Link>.
        </Box>
        }
        {app === "restitutionIntro" &&
        <Box mt="8" fontSize={"md"} align={"center"}>
          If you have used this tool before, you can <Link to={"/restitution/worksheet"}>skip to the start</Link>.
        </Box>
        }
      </form>
    </PageLayout>
  )
}

MultiStepsLayout.propTypes = propTypes
MultiStepsLayout.defaultProps = defaultProps
