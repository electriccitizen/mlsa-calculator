import React, { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import { FaCheckCircle } from "react-icons/fa"
import {
  List,
  ListItem,
  UnorderedList,
  Link,
  Heading,
  Divider,
  Text,
  Box,
  useColorMode,
} from "@chakra-ui/core"

import { PageLayout } from "../layout/PageLayout"
import { LinkIcon } from "@chakra-ui/icons"
export default function Safety() {
  const { colorMode } = useColorMode()
  return (
    <PageLayout>
      <Box mb="8">
        <Heading as="h1" mb={4}>
          Calculator Guide
        </Heading>
        <Text mb={"4"}>
         TBD
        </Text>
      </Box>
    </PageLayout>
  )
}
