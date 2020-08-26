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
          Safe Internet Use
        </Heading>
        <Text mb={"4"}>
          If you feel unsafe in your household or in your relationship, this
          safe internet use information may help you keep yourself, your family,
          and your information safe.
        </Text>
        <Box ml="8">
          <Heading as="h2" size="lg" mb={4}>
            Escape Button
          </Heading>
          <Text
            mb={"4"}
            mt={2}
            color={colorMode === "dark" ? "gray.600" : "gray.500"}
          >
            <p>
              Many websites that have information about domestic violence,
              sexual assault, or stalking have a “quick escape” or “leave this
              website” button at the top of their webpages. These buttons or
              messages allow someone to quickly leave the website if they are
              concerned that it could be an issue should someone know that they
              are seeking this kind of information.
            </p>
            <p>
              This button is helpful only if someone is watching over your
              shoulder or enters a room and you need to quickly switch to
              another website. It will not prevent the other person from going
              through your browser history or from knowing you were on that
              website if they are monitoring your device or internet activity
              remotely.
            </p>
          </Text>
          <Heading as="h2" size="lg" mb={4}>
            Internet Safety Tips
          </Heading>
          <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
            <p>
              To minimize the chances of someone knowing that you are
              researching information about domestic violence, sexual assault,
              or stalking, follow these tips.
            </p>
            <p>
              If you think your devices or internet search activities are being
              monitored, access this information from a device that isn’t being
              monitored. That should be a device that the person does not or has
              not had physical or remote access. This is the safest thing to do
              if you don’t want someone to know that you are visiting these
              websites.
            </p>
            <p>
              Sign out of other accounts, such as Google or Facebook, before
              visiting these sites.
            </p>
            <p>
              Use your internet browser settings to increase your privacy, such
              as turning off browsing history or using the browser’s in-private
              mode. To browse privately:
            </p>
            <Box mb={2} ml={12}>
              <ul>
                <li>Chrome: under Menu, click New Incognito Window</li>
                <li>Firefox: under Menu, click New Private Window</li>
                <li>
                  Internet Explorer: under Safety Menu, click InPrivate Browsing
                </li>
                <li>Safari: under File, click New Private Window</li>
              </ul>
            </Box>
            <p>
              To stop someone from seeing where you have been on the Internet,
              victims can clear their browsing history:
            </p>
            <Box mb={2} ml={12}>
              <ul>
                <li>
                  Chrome: under Menu, click History and recent tabs > History >
                  Clear browsing data
                </li>
                <li>
                  Firefox: open a new tab and click the gear icon, click Clear
                  browsing history
                </li>
                <li>
                  Internet Explorer: under Tools, click Safety > Delete browsing
                  history
                </li>
                <li>
                  Safari: under the Safari menu, click Clear History and Website
                  Data
                </li>
              </ul>
            </Box>
            <p>
              Wondering if your devices are being monitored? <Link color={"brand.400"} href="https://www.techsafety.org/computerspyware">Learn more about
              computer spyware</Link>.
            </p>
            <p>
              For more information on Internet and technology safety: <Link href="https://nnedv.org/mdocs-posts/technology-safety-quick-tips-chart/" color="brand.400">See Quick Safety Chart</Link>
            </p>
          </Text>
        </Box>
      </Box>
    </PageLayout>
  )
}
