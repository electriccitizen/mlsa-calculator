import React from "react"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import {
  Box,
  ListItem,
  ListIcon,
  Divider,
  useColorMode,
  List,
} from "@chakra-ui/core"

import { push as BurgerMenu } from "react-burger-menu"

import {
  FaCalculator,
  FaGlobe,
  FaThumbsUp,
  FaQuestionCircle,
  FaRegFileAlt,
  FaPhoneAlt,
} from "react-icons/fa/index"
const propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
}
const defaultProps = {
  direction: "left",
}
function IconSwap(icon) {
  switch (icon) {
    case "FaCalculator":
      return FaCalculator
    case "FaThumbsUp":
      return FaThumbsUp
    case "FaGlobe":
      return FaGlobe
    case "FaQuestionCircle":
      return FaQuestionCircle
    case "FaRegFileAlt":
      return FaRegFileAlt
    case "FaPhoneAlt":
      return FaPhoneAlt
    default:
      return null
  }
}
export const Menu = ({ menuLinks, menuLinks2, menuLinks3 }) => {
  const { colorMode } = useColorMode()

  const styles = {
    bmBurgerButton: {
      position: "absolute",
      width: "26px",
      height: "20px",
      left: "30px",
      top: "40px",
      border: "1px white",
    },
    bmBurgerBars: {
      background: colorMode === "dark" ? "gray" : "white",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#373a47",
      // padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  }

  return (
    <>
      <BurgerMenu
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        isOpen={false}
        styles={styles}
      >
        <List
          border="0"
          outline="none"
          w="100%"
          pl="4"
          pr="4"
          mt="4"
          spacing="4"
        >
          {menuLinks.map(link => (
            <Box key={link.link}>
              {/*{icon = IconSwap(link.icon)}*/}
              <ListItem key={link.link}>
                <ListIcon as={IconSwap(link.icon)} color="brand" />
                <GatsbyLink className="menulink" to={link.link}>
                  {link.name}
                </GatsbyLink>
                <p>{link.text}</p>
              </ListItem>
            </Box>
          ))}
        </List>

        <Divider />
        <List
          border="0"
          outline="none"
          w="100%"
          pl="4"
          pr="4"
          mt="4"
          spacing="4"
        >
          {menuLinks2.map(link => (
            <Box key={link.link}>
              <IconSwap icon={link.icon} />
              <ListItem key={link.link}>
                <ListIcon as={IconSwap(link.icon)} color="brand" />
                <GatsbyLink className="menulink" to={link.link}>
                  {link.name}
                </GatsbyLink>
                <p>{link.text}</p>
              </ListItem>
            </Box>
          ))}
        </List>
        <Divider />
        <List
          border="0"
          outline="none"
          w="100%"
          pl="4"
          pr="4"
          mt="4"
          spacing="4"
        >
          {menuLinks3.map(link => (
            <Box key={link.link}>
              <IconSwap icon={link.icon} />
              <ListItem key={link.link}>
                <ListIcon as={IconSwap(link.icon)} color="brand" />
                <GatsbyLink className="menulink" to={link.link}>
                  {link.name}
                </GatsbyLink>
                <p>{link.text}</p>
              </ListItem>
            </Box>
          ))}
        </List>
      </BurgerMenu>
    </>
  )
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps
