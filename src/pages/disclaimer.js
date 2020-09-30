import React from "react"
import {
  Heading,
  Text,
  Box,
} from "@chakra-ui/core"

import { PageLayout } from "../layout/PageLayout"
export default function Disclaimer() {
  return (
    <>
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
            DISCLAIMER AND ACCESSIBILITY
          </Heading>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              Information Not Legal Advice
            </Heading>
            The information contained on this website / online tool is for
            informational purposes only and does not constitute legal advice.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              No Promise or Warranty
            </Heading>
            There is no promise or warranty as to the accuracy, completeness,
            adequacy, timeliness, or relevance of the information contained on
            this site.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              No Contract or Attorney-Client Relationship
            </Heading>
            Neither the information contained on this website nor the use
            thereof by a website visitor creates a contract or an
            attorney-client relationship.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            Viewing this website, or transmitting e-mail messages through this
            website, does not create an attorney-client relationship.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            Sending email to an attorney mentioned on this site does NOT create
            an attorney-client relationship between you and the attorney.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            Unless you are already a client of the attorney, your email may NOT
            be protected by the attorney-client privilege. Moreover, unless it
            is encrypted, email can be intercepted by persons other than the
            recipient.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            Deadlines are extremely important in most legal matters. You may
            lose important legal rights if you do not hire an attorney
            immediately to advise you.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              Information Not Legal Advice
            </Heading>
            These tools, the Child Support Calculator and Restitution Workbook,
            are provided by Montana Legal Services Association and its MT Victim
            Legal Assistance Network (MT VLAN).
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              Lawyer Advertising
            </Heading>
            In some jurisdictions, information found on this site may be
            considered lawyer advertising. Any attorney listing does not
            constitute a recommendation of the attorney. Before hiring any
            attorney, you should investigate the attorney’s reputation and
            qualifications.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              Links
            </Heading>
            This site contains links to other online resources. Those links are
            provided help you identify and locate other online resources that
            may be of interest. They are not intended to imply that MLSA
            sponsors or is affiliated with the persons or entities who created
            such site. Neither are the links intended to state or imply that
            MLSA is legally authorized to use any trade name, registered
            trademark, logo, legal or official seal, or copyrighted symbol that
            may be reflected in the links.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            Neither MTCrimeVictimHelp.org nor MLSA is responsible for the
            content of any comments posted on the website or on any site
            accessible through a link on this site.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              Translation
            </Heading>
            If you need translation services, please contact MLSA directly
            through our HelpLine at 1-800-666-6899.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            <Heading as={"h3"} fontSize="lg">
              Accessibility
            </Heading>
            MLSA is committed to providing information that is accessible to the
            widest possible audience, regardless of technology or ability. This
            website endeavors to conform to Web Content Accessibility Guidelines
            2.0.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            If you need to mail or fax a paper application, please download the
            paper application here. Mail to 616 Helena Ave, Suite 100, Helena,
            MT 59601 or Fax to 406-442-9817.{" "}
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            MLSA provides free translation services for more than 240 languages.
            If you need translation services, please contact MLSA directly
            through our HelpLine. Deaf, hard of hearing, or speech impaired
            callers can call 711 or use the relay service of their choice.
          </Text>
          <Text mb={"4"} fontSize={"lg"}>
            We are continually seeking solutions that will bring all areas of
            the site up to the same level of overall web accessibility. In the
            meantime, should you experience difficulty in accessing this site,
            please don’t hesitate to contact us at vlan@mtlsa.org.
          </Text>
        </Box>
      </PageLayout>
    </>
  )
}
