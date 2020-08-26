import React, { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import { FaCalculator } from "react-icons/fa"
import { Heading, Divider, Text, Box, useColorMode } from "@chakra-ui/core"

import { PageLayout } from "../layout/PageLayout"
export default function TermsOfUse() {
  const { colorMode } = useColorMode()
  return (
    <>
      <PageLayout>
        <Box mb="8">
          <Heading as="h1" mb={4}>
            Privacy Notice
          </Heading>
          <Text mb={"4"}>
            MLSA is committed to your privacy. It is important to us. Our
            privacy policy describes how we collect and use information about
            you. This policy doesn't apply to other sites you reach through this
            tool. You should read the privacy policies of other Web sites to
            learn how they collect and use information about you.
          </Text>
          <Box ml="8">
            <Heading as="h2" size="lg" mb={4}>
              Google Analytics
            </Heading>
            <Text
              mb={"4"}
              mt={2}
              color={colorMode === "dark" ? "gray.600" : "gray.500"}
            >
              MLSA uses Google Analytics to gather usage statistics. We use the
              information gathered to improve web services for its users. Google
              Analytics employs cookies to define user sessions, which allows
              for the collection of important data about how our users are using
              this tool. Google Analytics uses only first-party cookies for data
              analysis. This means that the cookies are linked to the
              MTCrimeVictimHelp.org website domain(s), and Google Analytics will
              only use that cookie data for statistical analysis related to your
              browsing behavior on the MLSA tools and websites. According to
              Google, the data collected cannot be altered or retrieved by
              services from other domains. If you choose, you can opt out by
              turning off cookies in the preferences settings in your browser.
              For more information on Google Analytics, please visit Google’s
              web site.
            </Text>
            <Heading as="h2" size="lg" mb={4}>
              Who can I contact with question about this Privacy Policy?
            </Heading>
            <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
              You can contact Montana Legal Services Association's Victim Legal
              Assistance Network at vlan@mtlsa.org if you have any questions
              about this Privacy Policy.
            </Text>
          </Box>
        </Box>
      </PageLayout>
    </>
  )
}
