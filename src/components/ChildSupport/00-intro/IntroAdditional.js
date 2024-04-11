import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Heading, Icon } from "@chakra-ui/react"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa"
export const IntroAdditional = () => {
  return (
    <FormizStep label={"Find additional help"} name="introAdditional" order={1000}>
        <SectionHeader header={"Find additional help"} />
        <Text mb={2}>
          For more information about child support in Montana, you can contact
          the following:
        </Text>
        <Heading
          as="h2"
          fontSize="2xl"
          lineHeight="tall"
          fontWeight="normal"
          color={"gray.500"}
          href="#"
        >
          <Icon color={"brand.400"} as={FaInfoCircle} mr={2}/> Montana Legal Services
          Association (MLSA)
        </Heading>
        <Text mb={4}>
            MLSA provides free civil legal assistance to low-income Montanans. Call the MLSA HelpLine toll free at 1-800-666-6899. HelpLine hours vary, you can apply any time at {" "}
          <Link isExternal href={" https://www.montanalawhelp.org/apply-legal-services"} color={"brand.400"}>
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
          <Icon color={"brand.400"} as={FaInfoCircle} mr={2} /> MontanaLawHelp
        </Heading>
        <Text mb={2}>
          MLSA operates{" "}
          <Link isExternal href={"https://www.MontanaLawHelp.org"} color={"brand.400"}>
            www.MontanaLawHelp.org
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />, a website with legal
          information on topics including child support and other family law
          issues. Find{" "}
          <Link isExternal
            href={
              "https://www.montanalawhelp.org/issues/families-and-kids/child-support"
            }
            color={"brand.400"}
          >
            more information about child support in Montana
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> at our LawHelp
          website.
        </Text>
        <Heading
          as="h2"
          fontSize="2xl"
          lineHeight="tall"
          fontWeight="normal"
          color={"gray.500"}
          href="#"
        >
          <Icon color={"brand.400"} as={FaInfoCircle}  mr={2}/> Montana Child Support Services Division (CSSD)
        </Heading>
        <Text mb={2}>
            If you are concerned about your safety or the safety of your family members, it would be a good idea to talk to a Crime Victim Advocate (CVA). CVAs can answer basic questions about the law and help you come up with ways to protect your safety. You can find the,{" "}
          <Link isExternal
            href={
              "https://dojmt.gov/victims/crime-victim-advocates/"
            }
            color={"brand.400"}
          >
              CVA closest to you here.
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> You may pick up an
          application at a{" "}
          <Link isExternal
            href={
              "https://dphhs.mt.gov/cssd/Contacts"
            }
            color={"brand.400"}
          >
            local child support office
          </Link>.{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
        </Text>
    </FormizStep>
  )
}
