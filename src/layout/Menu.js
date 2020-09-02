import React from "react"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import {
  Icon,
  Link,
  Divider,
  useColorMode,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/core"

import { push as BurgerMenu } from "react-burger-menu"

import {
  FaCalculator,
  FaGlobe,
  FaThumbsUp,
  FaQuestionCircle,
} from "react-icons/fa/index"
const propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
}
const defaultProps = {
  direction: "left",
}
export const Menu = ({ direction, menuLinks }) => {
  const { colorMode } = useColorMode()
  const styles = {
    bmBurgerButton: {
      position: "absolute",
      width: "26px",
      height: "20px",
      left: "30px",
      top: "38px",
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
  let icon

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
      default:
        return null
    }
  }

  return (
    <BurgerMenu
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      isOpen={false}
      styles={styles}

    >
      <List border="0" outline="none" w="100%" pl="4" pr="4" mt="4" spacing="12">
        {menuLinks.map(link => (
          <>
            {(icon = IconSwap(link.icon))}
            <ListItem mb={4} key={link.link}>
              <ListIcon as={icon} color="brand" />
              <GatsbyLink to={link.link}>
                <Link fontWeight="bold" color="gray.300">
                  {link.name}
                </Link>
              </GatsbyLink>
              <p>{link.text}</p>
            </ListItem>
          </>
        ))}
      </List>

      <Divider  />
      {/*<Heading mt="8" as="h3" fontSize={"md"}>*/}
      {/*  About MLSA*/}
      {/*</Heading>*/}
      {/*<Text>*/}
      {/*  This tool was developed by the Montana Legal Services Association.*/}
      {/*  <br />*/}
      {/*  <Link color={"gray.300"}>Learn more</Link> <Icon as={FaArrowAltCircleRight} />*/}
      {/*</Text>*/}
    </BurgerMenu>


  )
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps
