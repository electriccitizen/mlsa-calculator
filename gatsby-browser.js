// import React from "react"
// import { ChakraProvider } from "@chakra-ui/react"
// import theme from "./src/theme"
// //import theme from '@chakra-ui/theme';
//
// export const wrapRootElement = ({ element }) => {
//   return <ChakraProvider theme={theme}>{element}</ChakraProvider>
// }

// export function shouldUpdateScroll(prevRouterProps, { location }) {
//     window.scrollTo(0, 0)
//     const body = document.getElementsByTagName('body')[0]
//     body.scrollTop = 0
//     return false
// }
// exports.shouldUpdateScroll = ({
//                                   routerProps: { location },
//                                   getSavedScrollPosition,
//                               }) => {
//     return location.href.indexOf("#") > -1 ? false : true;
// };
// exports.shouldUpdateScroll = () => {
//         window.scrollTo(0, 0)
//     return false
// }