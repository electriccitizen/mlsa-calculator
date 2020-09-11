import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Formiz, useForm } from "@formiz/core"
import {
  Icon,
  Box,
  Grid,
  Button,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core"
import { PageLayout } from "../layout/PageLayout"
import { FaChevronDown, FaRegFileAlt } from "react-icons/fa"

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

export const CalculatorIntroLayout = ({
                                         form: externalForm,
                                         children,
                                         submitLabel = "Submit",
                                         ...props
                                       }) => {
  const internalForm = useForm()
  const form = externalForm || internalForm
  const hasSteps = !!form.steps.length
  const windowGlobal = typeof window !== "undefined" && window
  const handleSubmit = () => {
    windowGlobal.location.href = "/child-support/calculator"
  }

  return (
    <Formiz connect={form} {...props}>
      <PageLayout>
        <form noValidate onSubmit={hasSteps ? form.submitStep : form.submit}>
          <Stack w="100%" direction={["column", "row"]}>
            <Box mb="2" width="100%" align="right" flex={1}>
              <Menu>
                <>
                  <MenuButton
                    fontSize={"sm"}
                    as={Button}
                    rightIcon={<FaChevronDown />}
                    colorScheme={"brand"}
                  >
                    <Icon as={FaRegFileAlt} mr={2} />
                   Child Support Calculator
                  </MenuButton>
                  <MenuList fontSize={"sm"}>
                    {form.steps?.map(
                      (step, index) =>
                        step.isValid && (
                          <MenuItem onClick={() => form.goToStep(step.name)}>
                            Step {index + 1}: {step.label}
                          </MenuItem>
                        )
                    )}
                    <MenuItem onClick={() => handleSubmit()}>
                      Start calculator
                    </MenuItem>
                  </MenuList>
                </>
              </Menu>
            </Box>
          </Stack>

          {children}
          {hasSteps && (
            <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
              {!form.isFirstStep && (
                <Button gridColumn="1" onClick={form.prevStep}>
                  Previous
                </Button>
              )}

              <>
                <Box
                  gridColumn="2"
                  textAlign="center"
                  fontSize="sm"
                  color="gray.500"
                >
                  Introduction {form.currentStep.index + 1} /{" "}
                  {form.steps.length}
                </Box>

                <Button
                  type="submit"
                  gridColumn="4"
                  colorScheme="brand"
                  isDisabled={
                    (form.isLastStep ? !form.isValid : !form.isStepValid) &&
                    form.isStepSubmitted
                  }
                >
                  {form.isLastStep ? submitLabel : "Next"}
                </Button>
              </>
            </Grid>
          )}
        </form>
        <Box
          color="gray.500"
          mt="8"
          fontSize="md"
          width={"100%"}
          align={"center"}
        >
          Have you used this tool before? If so, you can{" "}
          <Link to="/child-support/calculator" color={"brand.400"}>
            skip to the start
          </Link>
          .
        </Box>
      </PageLayout>
    </Formiz>
  )
}

CalculatorIntroLayout.propTypes = propTypes
CalculatorIntroLayout.defaultProps = defaultProps
