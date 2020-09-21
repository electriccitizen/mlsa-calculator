import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Heading, Icon } from "@chakra-ui/core"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa/index"
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
          MLSA provides free civil legal assistance to low-income Montanans.
          Call the MLSA HelpLine toll free at 1-800-666-6899. We answer the
          phone Monday through Friday between 9am and 1pm.
          <Link href={"https://www.mtlsa.org/"} color={"brand.400"}>
            Visit our website
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
          <Link href={"https://>www.MontanaLawHelp.org"} color={"brand.400"}>
            www.MontanaLawHelp.org
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />, a website with legal
          information on topics including child support and other family law
          issues. Find{" "}
          <Link
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
          <Icon color={"brand.400"} as={FaInfoCircle}  mr={2}/> Montana Child Support
          Enforcement Division (CSED)
        </Heading>
        <Text mb={2}>
          The Montana Child Support Enforcement Division (CSED), part of the MT
          Department of Health and Human Services (DPHHS). To open a case with
          CSED,{" "}
          <Link
            href={
              "https://lawhelpinteractive.org/DispInterview?q=FmLSVfmGtLZ7fRvIcaIv2YiSdixIDjGVp6W4gZKaP%2F6zPrylM3kC6S2%2FsFsA%2B%2FBINC%2BkMhNmksQCIJXKDHRYin3dm1KXFrlrwoBySU799rMegEN85vGWk3kZOA0KoKinvb2gvb4X0D%2FVTl7E%2BhBYiPVyTps0SbN1eKw0gaaMKA34eb0ZCil3O2oGeTm90H5uyUtQ0W%2BJKPPiPJJMbh4NP0Ud1hLX7FPXe4hH2J1HR0pxY%2BGta0zYMKkBMbDV0%2BogInDTBbEltQwhs8INnp1k7z4h0gPRwGTR2x2zPRg2T%2FxhH3JBA8yYxdpF3C%2BG22xWeLNdDxGQO32f2KcPDv9zVQ%3D%3D#"
            }
            color={"brand.400"}
          >
            you may download an application.
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> You may pick up an
          application at a{" "}
          <Link
            href={
              "https://lawhelpinteractive.org/DispInterview?q=FmLSVfmGtLZ7fRvIcaIv2YiSdixIDjGVp6W4gZKaP%2F6zPrylM3kC6S2%2FsFsA%2B%2FBINC%2BkMhNmksQCIJXKDHRYin3dm1KXFrlrwoBySU799rMegEN85vGWk3kZOA0KoKinvb2gvb4X0D%2FVTl7E%2BhBYiPVyTps0SbN1eKw0gaaMKA34eb0ZCil3O2oGeTm90H5uyUtQ0W%2BJKPPiPJJMbh4NP0Ud1hLX7FPXe4hH2J1HR0pxY%2BGta0zYMKkBMbDV0%2BogInDTBbEltQwhs8INnp1k7z4h0gPRwGTR2x2zPRg2T%2FxhH3JBA8yYxdpF3C%2BG22xWeLNdDxGQO32f2KcPDv9zVQ%3D%3D#"
            }
            color={"brand.400"}
          >
            local child support office
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />.
        </Text>
    </FormizStep>
  )
}
