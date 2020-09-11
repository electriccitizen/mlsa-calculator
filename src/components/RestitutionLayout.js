import React, { useState } from "react"
import PropTypes from "prop-types"
import { Formiz, FormizStep, useForm } from "@formiz/core"
import {
  Box,
  Grid,
  Button,
  Stack,
  Heading,
  useColorMode,
  useDisclosure,
  Text,
  Icon,
} from "@chakra-ui/core"
import { PageLayout } from "../layout/PageLayout"
import { FaChevronDown, FaRegFileAlt } from "react-icons/fa"
import { Menu, MenuItem } from "@chakra-ui/core"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core"
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

export const RestitutionLayout = ({
  children,
  submitLabel = "Submit",
  ...props
}) => {
  const form = useForm()
  const hasSteps = !!form.steps.length
  const isMontana = true
  const [isLoaded, setIsLoaded] = useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    })
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const { colorMode } = useColorMode()

  const windowGlobal = typeof window !== "undefined" && window
  const handleSubmit = () => {
    windowGlobal.location.href = "/"
  }
  return (
    <Formiz connect={form} {...props}>
      {/*<PersistForm />*/}
      <PageLayout {...props}>
        {isLoaded ? (
          <form noValidate onSubmit={hasSteps ? form.submitStep : form.submit}>
            <Stack w="100%" direction={["column", "row"]}>
              <Box mb="2" width="100%" align="right" flex={1}>
                <Button ref={btnRef} colorScheme="brand" onClick={onOpen}>
                  <Icon as={FaRegFileAlt} mr={2} />
                  Restitution Worksheet
                  <Icon as={FaChevronDown} ml={2} />
                </Button>
                <Drawer
                  isOpen={isOpen}
                  placement="right"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  size={"md"}
                >
                  <DrawerOverlay>
                    <DrawerContent bg={colorMode === "dark" ? "gray.400" : "gray.50"}>
                      <DrawerCloseButton />
                      <DrawerHeader color={"gray.100"} bg={"brand.500"}>
                        <Icon as={FaRegFileAlt} mr={2} /> Restitution Worksheet
                      </DrawerHeader>
                      <DrawerBody color={"gray.900"}>
                        <Menu>
                          {form.steps?.map((step, index) =>
                            step.name === "TermsOfUse" && !step.isValid ? (
                              <MenuItem onClick={() => handleSubmit()}>
                                Exit the worksheet
                              </MenuItem>
                            ) : (
                              // step.isValid && (
                              <MenuItem
                                isDisabled={step.isValid ? false : true}
                                onClick={() => form.goToStep(step.name)}
                              >
                                Step {index + 1}: {step.label}
                              </MenuItem>
                              // )
                            )
                          )}
                        </Menu>
                      </DrawerBody>
                      <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </DrawerOverlay>
                </Drawer>
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
                        form.isFirstStep === true &&
                        (form.values.initiate && form.values.initiate.terms) === "no"
                          ? true
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
          "sorry"
        )}
      </PageLayout>
    </Formiz>
  )
}

RestitutionLayout.propTypes = propTypes
RestitutionLayout.defaultProps = defaultProps
