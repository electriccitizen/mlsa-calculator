import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Heading, Icon } from "@chakra-ui/core"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa/index"
export const IntroCode = () => {
  return (
    <FormizStep label={"Montana Code"} name="introcode" order={1000}>
      <SectionHeader header={"Montana Code"} />
      <Text mb={2}>
        (rewrite) You may wish to speak with an attorney about this process or
        paperwork.
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Montana Legal Services
        Association (MLSA)
      </Heading>
      <Text mb={4}>
        Montana Legal Services Association (MLSA) gives free civil legal help to
        low-income people.
        <Link href={"https://goo.gl/7xgkgj"} color={"brand.400"}>
          {" "}
          Apply online
        </Link>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> AskKarla
      </Heading>
      <Text mb={2}>
        If you're eligible for MLSA, you may also get legal advice by email from
        AskKarla. Go to{" "}
        <Link href={"https://askkarla.org/"} color={"brand.400"}>
          {" "}
          AskCarla
        </Link>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Montana Bar Lawyer
        Referral and Information Service
      </Heading>
      <Text mb={2}>
        You may be able to find an attorney to help you by calling the State of
        Montana Bar Lawyer Referral and Information Service (LRIS) at (406)
        449-6577. Or visit{" "}
        <Link href={"http://www.montanabar.org"} color={"brand.400"}>
          {" "}
          LRIS online
        </Link>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
      </Text>
    </FormizStep>
  )
}
