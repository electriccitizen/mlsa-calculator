import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Formiz, useForm } from "@formiz/core"
import {
  Icon,
  Box,
  Grid,
  Button,
  Stack,
  Menu,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure, useColorMode,
} from '@chakra-ui/core'

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

export const RestitutionIntroLayout = ({
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
    windowGlobal.location.href = "/restitution/worksheet"
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const { colorMode } = useColorMode()

  return (
    <Formiz connect={form} {...props}>
      <PageLayout>
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
                  <DrawerContent bg={colorMode === "dark" ? "gray.300" : "gray.50"}>
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
                        <MenuItem onClick={() => handleSubmit()}>
                          Start worksheet
                        </MenuItem>
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
          <Link to="/restitution/worksheet" color={"brand.400"}>
            skip to the start
          </Link>
          .
        </Box>
      </PageLayout>
    </Formiz>
  )
}

RestitutionIntroLayout.propTypes = propTypes
RestitutionIntroLayout.defaultProps = defaultProps
