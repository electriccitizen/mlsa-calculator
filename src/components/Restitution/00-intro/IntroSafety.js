import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text,  Heading, Icon } from "@chakra-ui/react"
import { FaInfoCircle  } from "react-icons/fa/index"
export const IntroSafety = () => {
  return (
    <FormizStep label={"Safety and privacy"} name="introSafety" order={1000}>
      <SectionHeader header={"Safety and privacy"} />
      <Text mb={2}>
        This tool does not collect or store any personal information, but basic
        safety precautions should be taken into account:
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Using a public computer
      </Heading>
      <Text mb={4}>
        If you are using a public computer, be sure to close the browser when
        complete. Do not download your results to a public computer.
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Browsing safety
      </Heading>
      <Text mb={2}>
        If you feel unsafe in your household or in your relationship, this <a target="_new" href="./safety">safe
        internet use information</a> may help you keep yourself, your family, and
        your information safe.
      </Text>
      {/*<Heading*/}
      {/*  as="h2"*/}
      {/*  fontSize="2xl"*/}
      {/*  lineHeight="tall"*/}
      {/*  fontWeight="normal"*/}
      {/*  color={"gray.500"}*/}
      {/*  href="#"*/}
      {/*>*/}
      {/*  <Icon color={"brand.400"} as={FaInfoCircle} /> Domestic Violence*/}
      {/*</Heading>*/}
      {/*<Text mb={2}>*/}
      {/*  The Montana Child Support Enforcement Division (CSED), part of the MT*/}
      {/*  Department of Health and Human Services (DPHHS). To open a case with*/}
      {/*  CSED,{" "}*/}
      {/*  <Link*/}
      {/*    href={*/}
      {/*      "https://lawhelpinteractive.org/DispInterview?q=FmLSVfmGtLZ7fRvIcaIv2YiSdixIDjGVp6W4gZKaP%2F6zPrylM3kC6S2%2FsFsA%2B%2FBINC%2BkMhNmksQCIJXKDHRYin3dm1KXFrlrwoBySU799rMegEN85vGWk3kZOA0KoKinvb2gvb4X0D%2FVTl7E%2BhBYiPVyTps0SbN1eKw0gaaMKA34eb0ZCil3O2oGeTm90H5uyUtQ0W%2BJKPPiPJJMbh4NP0Ud1hLX7FPXe4hH2J1HR0pxY%2BGta0zYMKkBMbDV0%2BogInDTBbEltQwhs8INnp1k7z4h0gPRwGTR2x2zPRg2T%2FxhH3JBA8yYxdpF3C%2BG22xWeLNdDxGQO32f2KcPDv9zVQ%3D%3D#"*/}
      {/*    }*/}
      {/*    color={"brand.400"}*/}
      {/*  >*/}
      {/*    you may download an application.*/}
      {/*  </Link>{" "}*/}
      {/*  <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> You may pick up an*/}
      {/*  application at a{" "}*/}
      {/*  <Link*/}
      {/*    href={*/}
      {/*      "https://lawhelpinteractive.org/DispInterview?q=FmLSVfmGtLZ7fRvIcaIv2YiSdixIDjGVp6W4gZKaP%2F6zPrylM3kC6S2%2FsFsA%2B%2FBINC%2BkMhNmksQCIJXKDHRYin3dm1KXFrlrwoBySU799rMegEN85vGWk3kZOA0KoKinvb2gvb4X0D%2FVTl7E%2BhBYiPVyTps0SbN1eKw0gaaMKA34eb0ZCil3O2oGeTm90H5uyUtQ0W%2BJKPPiPJJMbh4NP0Ud1hLX7FPXe4hH2J1HR0pxY%2BGta0zYMKkBMbDV0%2BogInDTBbEltQwhs8INnp1k7z4h0gPRwGTR2x2zPRg2T%2FxhH3JBA8yYxdpF3C%2BG22xWeLNdDxGQO32f2KcPDv9zVQ%3D%3D#"*/}
      {/*    }*/}
      {/*    color={"brand.400"}*/}
      {/*  >*/}
      {/*    local child support office*/}
      {/*  </Link>{" "}*/}
      {/*  <Icon boxSize={"12px"} as={FaExternalLinkAlt} />.*/}
      {/*</Text>*/}
    </FormizStep>
  )
}
