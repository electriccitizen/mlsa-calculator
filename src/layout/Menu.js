import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import {
  Stack,
  Icon,
  useColorMode,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/core"
import { push as BurgerMenu } from "react-burger-menu"

const propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
}
const defaultProps = {
  direction: "left",
}

var styles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    left: "30px",
    top: "32px",
  },
  bmBurgerBars: {
    background: "#373a47",
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
    padding: "2.5em 1.5em 0",
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

export const Menu = ({ direction, menuLinks }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <BurgerMenu
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      isOpen={false}
      styles={styles}
      mt="-4"
    >

      <List spacing={3}>
        {menuLinks.map(link => (
          <ListItem>
            <ListIcon icon="check-circle" color="green.500" />
            <Link style={{ color: `white` }} to={link.link}> {link.name} </Link>
          </ListItem>
        ))}
      </List>

      {/*<a id="home" className="menu-item" href="/">*/}
      {/*  Home*/}
      {/*</a>*/}
      {/*<a id="about" className="menu-item" href="/about">*/}
      {/*  About*/}
      {/*</a>*/}
      {/*<a id="contact" className="menu-item" href="/contact">*/}
      {/*  Contact*/}
      {/*</a>*/}
    </BurgerMenu>
  )
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps
