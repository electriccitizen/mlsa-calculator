import React from "react"
import { Heading, Text, Box } from "@chakra-ui/react"

import { PageLayout } from "../layout/PageLayout"

export default function Contact() {
  return (
    <PageLayout>
      <Box mb="8">
        <Heading
          fontFamily={
            '-apple-system, BlinkMacSystemFont, "Segoe UI",\n' +
            "               Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n" +
            '               "Helvetica Neue", sans-serif;'
          }
          as="h1"
          mb={4}
        >
          Contact Us
        </Heading>
        <Text mb={"4"}>
          Website: <a isExternal href={"https://www.mtlsa.org/"}>https://www.mtlsa.org</a>
          <br />
          Email: <a href={"mailto:contactus@mtlsa.org"}>contactus@mtlsa.org</a>
          <br />
          Phone: 1 (800) 666-6899
          <br />
        </Text>
        <Text mb={"4"}>
          Mail:
          <br />
          Montana Legal Services Association<br />
          616 Helena Avenue, Suite 100
          <br />
          Helena, MT 59601
          <br />
        </Text>
      </Box>
    </PageLayout>
  )
}
