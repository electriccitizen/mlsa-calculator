import React from "react"
import {
  Heading,
  Text,
  Box,
} from "@chakra-ui/core"

import { PageLayout } from "../layout/PageLayout"

export default function Safety() {
  return (
    <PageLayout>
      <Box mb="8">
        <Heading
          fontFamily={
            '-apple-system, BlinkMacSystemFont, "Segoe UI",\n' +
            "               Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n" +
            '               "Helvetica Neue", sans-serif;'
          }
          as="h1" mb={4}>
          About Montana Legal Services Association
        </Heading>
        <Text mb={"4"}>
         TBD
        </Text>
      </Box>
    </PageLayout>
  )
}
