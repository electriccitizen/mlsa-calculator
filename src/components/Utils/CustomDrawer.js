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
  useDisclosure,
  useColorMode,
} from "@chakra-ui/core"
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

  const numChildren = form.values.NumPrimaryChildren
  const numOtherChildren = form.values.NumOtherChildren
  const numOtherChildrenSecondary = form.values.NumOtherChildrenSecondary

  let stepLabel
  const switchLabel = (name, label, index, x, numChildren) => {
    switch (name) {
      case "OtherParent":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: Other parent (${form.values.OtherParentName})`
          : `Step ${index + 1}: Other parent's name`
        break
      case "NumberChildren":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: Your children with ${
              form.values.OtherParentName
            }`
          : `Step ${index + 1}: Number of children`
        break
      case "OtherChildrenSecondary":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: ${form.values.OtherParentName}'s other children`
          : `Step ${index + 1}: Additional children (other parent)`
        break
      case "CurrentJobSecondary":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: ${
              form.values.OtherParentName
            }'s employment status`
          : `Step ${index + 1}: Employment status (other parent)`
        break
      case "OtherIncomeSecondary":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: ${form.values.OtherParentName}'s other income`
          : `Step ${index + 1}: Other parent (other parent)`
        break
      case "AllowableDeductionsSecondary":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: ${
              form.values.OtherParentName
            }'s allowable deductions`
          : `Step ${index + 1}: Allowable deductions (other parent)`
        break
      case "StandardOfLivingSecondary":
        stepLabel = form.values.OtherParentName
          ? `Step ${index + 1}: ${
              form.values.OtherParentName
            }'s Standard of Living adjustment`
          : `Step ${index + 1}: Standard of Living adjustment (other parent)`
        break
      case `ChildExpenses0`:
      case "ChildExpenses1":
      case "ChildExpenses2":
      case "ChildExpenses3":
      case "ChildExpenses4":
      case "ChildExpenses5":
      case "ChildExpenses6":
      case "ChildExpenses7":
        stepLabel = form.values.PrimaryChildren
          ? `Step ${index + 1}: Expenses for ${
              form.values.PrimaryChildren[x] &&
              form.values.PrimaryChildren[x].fname
            } (${parseInt(x) + 1} of ${numChildren})`
          : ""
        break
      case `ChildExpensesSecondary0`:
      case "ChildExpensesSecondary1":
      case "ChildExpensesSecondary2":
      case "ChildExpensesSecondary3":
      case "ChildExpensesSecondary4":
      case "ChildExpensesSecondary5":
      case "ChildExpensesSecondary6":
      case "ChildExpensesSecondary7":
        stepLabel = form.values.OtherChildrenSecondary
          ? `Step ${index + 1}: ${form.values.OtherParentName}'s expenses for ${
              form.values.OtherChildrenSecondary[x] &&
              form.values.OtherChildrenSecondary[x].fname
            } (${parseInt(x) + 1} of ${numOtherChildrenSecondary})`
          : ""
        break
      case "EnterChildren0":
      case "EnterChildren1":
        stepLabel = form.values.PrimaryChildren
          ? `Step ${index + 1}: ${
              form.values.PrimaryChildren[x] &&
              form.values.PrimaryChildren[x].fname
            } (${parseInt(x) + 1} of ${numChildren})`
          : `Step ${index + 1}: ${label}`
        break
      case "EnterMyOtherChildren0":
      case "EnterMyOtherChildren1":
        stepLabel = form.values.OtherChildren
          ? `Step ${index + 1}: ${
              form.values.OtherChildren[x] && form.values.OtherChildren[x].fname
            } (${parseInt(x) + 1} of ${numOtherChildren})`
          : `Step ${index + 1}: ``Step ${index + 1}: Expenses for ${x}`
        break
      case "EnterMyOtherChildrenSecondary0":
      case "EnterMyOtherChildrenSecondary1":
        stepLabel = form.values.OtherChildrenSecondary
          ? `Step ${index + 1}: ${
              form.values.OtherChildrenSecondary[x] &&
              form.values.OtherChildrenSecondary[x].fname
            } (${parseInt(x) + 1} of ${numOtherChildrenSecondary})`
          : `Step ${index + 1}: ``Step ${index + 1}: Expenses for ${x}`
        break
      default:
        stepLabel = `Step ${index + 1}: ${label}`
    }
    return stepLabel
  }
  const handleSubmit = url => {
    navigate(url)
  }

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="brand"
        mb={4}
        onClick={() => {
          onOpen()
        }}
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
        <DrawerOverlay>
          <DrawerContent bg={colorMode === "dark" ? "gray.300" : "gray.50"}>
            <DrawerCloseButton />
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
                {form.steps.map((step, index) =>
                  step.name === "TermsOfUse" && !step.isValid ? (
                    <MenuItem
                      onClick={() => handleSubmit("/")}
                      pl={0}
                      key={index}
                    >
                      Exit the worksheet?
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={index}
                      isDisabled={step.isValid ? false : true}
                      onClick={() => form.goToStep(step.name)}
                      pl={
                        step.name.startsWith("EnterChildren") ||
                        step.name.startsWith("EnterMyOtherChildren") ||
                        step.name.startsWith("TaxableIncome") ||
                        step.name.startsWith("NonTaxableIncome") ||
                        step.name.startsWith("OtherAllowableDeductions") ||
                        step.name.startsWith("OtherJobs") === true ||
                        step.name.startsWith("EnterOtherJobs") === true ||
                        step.name === "CurrentJob" === true
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
                          step.name.charAt(step.name.length - 1),
                        numChildren
                      )}
                    </MenuItem>
                  )
                )}
                {app === "supportIntro" && (
                  <MenuItem
                    pl={0}
                    onClick={() => handleSubmit("/child-support/calculator")}
                  >
                    Start interview
                  </MenuItem>
                )}
                {app === "restitutionIntro" && (
                  <MenuItem
                    pl={0}
                    onClick={() => handleSubmit("/restitution/worksheet")}
                  >
                    Start worksheet
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
    </>
  )
}

CustomDrawer.propTypes = propTypes
CustomDrawer.defaultProps = defaultProps
