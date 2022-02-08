import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import {
  Button,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Menu,
  MenuItem,
  DrawerFooter,
  Box,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react"
import { FaChevronDown, FaRegFileAlt, FaCalculator } from "react-icons/fa"
import { useForm } from "@formiz/core"
const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

export const CustomDrawer = ({ app, buttonTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const form = useForm({ subscribe: true })
  const { colorMode } = useColorMode()

  const switchLabel = (name, label, index, x) => {
    const primaryChildren = Object.values(form.values?.PrimaryChildren || {}).filter(child => child.status === 'none')
    const numPrimaryChildren = primaryChildren.length
    const numOtherChildren = form.values?.NumOtherChildren
    const numOtherChildrenSecondary = form.values?.NumOtherChildrenSecondary
    const otherParentFName = form.values?.OtherParent?.fname
    const primaryChildFName = primaryChildren?.[x]?.fname
    const otherChildFName = form.values?.OtherChildren?.[x]?.fname
    const otherChildSecondaryFName = form.values?.OtherChildrenSecondary?.[x]?.fname

    let stepLabel
    switch (name.replace(/[0-9]/g, '')) {
      case "OtherParent":
        stepLabel = otherParentFName && `${otherParentFName}'s information`
        break
      case "NumberChildren":
        stepLabel = otherParentFName && `Your children with ${otherParentFName}`
        break
      case "EnterChildren":
        stepLabel = form.values?.NumPrimaryChildren && `${form.values?.PrimaryChildren?.[x]?.fname ?? 'Child details'} (${parseInt(x) + 1} of ${form.values?.NumPrimaryChildren})`
        break
      case "EnterMyOtherChildren":
        stepLabel = numOtherChildren && `${otherChildFName ?? 'Child details'} (${parseInt(x) + 1} of ${numOtherChildren})`
        break
      case "OtherChildrenSecondary":
        stepLabel = otherParentFName && `${otherParentFName}'s other children`
        break
      case "EnterMyOtherChildrenSecondary":
        stepLabel = numOtherChildrenSecondary && `${otherChildSecondaryFName ?? 'Child details'} (${parseInt(x) + 1} of ${numOtherChildrenSecondary})`
        break
      case "CurrentJobSecondary":
        stepLabel = otherParentFName && `${otherParentFName}'s employment status`
        break
      case "OtherIncomeSecondary":
        stepLabel = otherParentFName && `${otherParentFName}'s other income`
        break
      case "AllowableDeductionsSecondary":
        stepLabel = otherParentFName && `${otherParentFName}'s allowable deductions`
        break
      case "StandardOfLivingSecondary":
        stepLabel = otherParentFName && `${otherParentFName}'s Standard of Living adjustment`
        break
      case `ChildExpenses`:
        stepLabel = numPrimaryChildren && `${primaryChildFName ? `Your expenses for ${primaryChildFName}` : 'Child expenses'} (${parseInt(x) + 1} of ${numPrimaryChildren})`
        break
      case `ChildExpensesSecondary`:
        stepLabel = numPrimaryChildren && `${(primaryChildFName && otherParentFName) ? `${otherParentFName}'s expenses for ${primaryChildFName}` : 'Child expenses'} (${parseInt(x) + 1} of ${numPrimaryChildren})`
        break
      default:
        stepLabel = label

    }
    return `Step ${index + 1}: ${stepLabel || label}`
  }
  const handleSubmit = url => {
    navigate(url)
  }

  return (
    <Box>
      <Button
        ref={btnRef}
        colorScheme="brand"
        mb={4}
        onClick={() => {
          onOpen()
        }}
        zIndex={5}
      >
        <Icon
          as={
            app === "supportIntro" || app === "support"
              ? FaCalculator
              : FaRegFileAlt
          }
          mr={2}
        />
        {buttonTitle}
        <Icon as={FaChevronDown} ml={2} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay zIndex={15}>
          <DrawerContent bg={colorMode === "dark" ? "gray.300" : "gray.50"}>
            <DrawerCloseButton color={"gray.100"} />
            <DrawerHeader color={"gray.100"} bg={"brand.500"}>
              <Icon
                as={
                  app === "supportIntro" || app === "support"
                    ? FaCalculator
                    : FaRegFileAlt
                }
                mr={2}
              />{" "}
              {buttonTitle}
            </DrawerHeader>
            <DrawerBody color={"gray.900"}>
              <Menu>
                {form.steps.map(
                  (step, index) =>
                    step.name !== "CompleteApp" && (
                      <MenuItem
                        key={index}
                        isDisabled={step.isValid ? false : true}
                        onClick={() => { form.goToStep(step.name); onClose(); }}
                        // Left padding
                        pl={
                          step.name.startsWith("EnterChildren") ||
                            step.name.startsWith("EnterMyOtherChildren") ||
                            step.name.startsWith("TaxableIncome") ||
                            step.name.startsWith("NonTaxableIncome") ||
                            step.name.startsWith("OtherAllowableDeductions") ||
                            step.name.startsWith("OtherAllowableDeductionsSecondary") ||
                            step.name.startsWith("OtherJobs") === true ||
                            step.name.startsWith("EnterOtherJobs") === true ||
                            step.name.startsWith("FirstResponderExpenses") === true ||
                            step.name.startsWith("SupplyExpenses") === true ||
                            step.name.startsWith("FutureExpenses") === true ||
                            step.name.startsWith("MentalHealthFuture") === true ||
                            step.name.startsWith("PropertyStolenLost") === true ||
                            step.name.startsWith("PropertyStolenRecovered") === true ||
                            step.name.startsWith("PropertyDamage") === true ||
                            step.name.startsWith("LostWages") === true ||
                            (step.name === "CurrentJob") === true
                            ? "8"
                            : "0"
                        }
                      >
                        {switchLabel(
                          step.name,
                          step.label,
                          index,
                          (step.name.startsWith("ChildExpenses") ||
                            step.name.startsWith("EnterChildren") ||
                            step.name.startsWith("EnterMyOtherChildren")) &&
                          step.name.charAt(step.name.length - 1)
                        )}
                      </MenuItem>
                    )
                )}
                {(form.isValid && (app === "support" || app === "restitution")) && (
                  <MenuItem onClick={() => form.goToStep("CompleteApp")} pl={0}>
                    {
                      app === "support" && 
                      "Complete interview"
                    }
                    {
                      app === "restitution" && 
                      "Complete workbook"
                    }
                  </MenuItem>
                )}
                {(app === "support" || app === "restitution") && (
                  <MenuItem onClick={() => handleSubmit("/")} pl={0}>
                    {
                      app === "support" && 
                      "Exit interview"
                    }
                    {
                      app === "restitution" && 
                      "Exit workbook"
                    }
                  </MenuItem>
                )}
                {app === "supportIntro" && (
                  <>
                    <MenuItem
                      pl={0}
                      onClick={() => handleSubmit("/child-support/calculator")}
                    >
                      Start interview
                    </MenuItem>
                  </>
                )}
                {app === "restitutionIntro" && (
                  <MenuItem
                    pl={0}
                    onClick={() => handleSubmit("/restitution/worksheet")}
                  >
                    Start workbook
                  </MenuItem>
                )}
              </Menu>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close{" "}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

CustomDrawer.propTypes = propTypes
CustomDrawer.defaultProps = defaultProps
