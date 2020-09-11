import React from "react"
import {
  Heading,
  Text,
  Box,
} from "@chakra-ui/core"

import { PageLayout } from "../../layout/PageLayout"
export default function ChildSupportIntro() {
  return (
    <PageLayout>
      <Box mb="8">
        <Heading as="h1" mb={4}>
          Child Support Calculator Guide
        </Heading>
        <Text mb={"4"}>
         TBD
        </Text>
      </Box>
    </PageLayout>
  )
}
