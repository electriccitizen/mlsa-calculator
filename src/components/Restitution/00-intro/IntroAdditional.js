import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Heading, Icon } from "@chakra-ui/react"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa"
export const IntroAdditional = () => {
  return (
    <FormizStep label={"Additional help"} name="introAdditional" order={1000}>
      <SectionHeader header={"Find additional help:"} />
      <Text mb={2}>
        For more information about restitution and the criminal process in Montana, you can contact the following:
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
            MLSA provides free civil legal assistance to low-income Montanans. Call the MLSA HelpLine toll free at 1-800-666-6899. HelpLine hours vary, you can apply any time at {" "}
            <Link href={" https://www.montanalawhelp.org/apply-legal-services"} color={"brand.400"}>
                MontanaLawHelp.org
            </Link>
            . <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
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
        You may be able to find an attorney to help you by calling the State
        of Montana Bar Lawyer Referral and Information Service (LRIS) at (406)
        449-6577. Or visit{" "}
        <Link href={"http://www.montanabar.org"} color={"brand.400"}>
          {" "}
          LRIS online
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
        If you're eligible for MLSA, you may also get legal advice by email
        from AskKarla. Go to{" "}
        <Link href={"https://askkarla.org/"} color={"brand.400"}>
          {" "}
          AskKarla
        </Link>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
      </Text>
    </FormizStep>
  )
}
