import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Heading, Box, Button, Text, Stack, Spinner } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"
import printJS from "print-js"
import { navigate } from "gatsby"

export const CompleteApp = ({ state, pdf }) => {
  const form = useForm({ subscribe: { fields: ["Documents"] } })
  const [counter, setCounter] = useState(0)

  const handlePrint = (key) => () => {
    const base64 = pdf[key]
      // console.log(base64)
    printJS({ printable: base64, type: "pdf", base64: true })
  }

  const handleExit = () => {
    setCounter(0)
    navigate("/")
  }

  const Documents = form.values.Documents
  const docPlural = Documents === "both" ? "documents " : "document "

  const docText =
    Documents === "both"
      ? "child support worksheet and financial affadavit"
      : Documents === "affadavit"
      ? "financial affadavit"
      : "child support worksheet"

  // const loadingMessageDownload = counter > 0 ? "Loading..." : "Download"
  // const loadingMessagePrint = counter > 0 ? "Loading..." : "Print"
    const loadingMessageDownload = counter > 0 ? <Spinner size="sm" /> : "Download";
    const loadingMessagePrint = counter > 0 ? <Spinner size="sm" /> : "Print";
  return (
    <FormizStep label={"Complete Interview"} name="CompleteApp" order={30000}>
      <SectionHeader header={`Interview complete`} />
      <Text mb={4} fontSize="lg">
        Your interview is now complete. Generate your completed {docText} below
        for download or printing:
      </Text>
        <Stack mb={8} align={"center"}>
            <Button
                colorScheme={"brand"}
                type={"submit"}
                onClick={() => setCounter(counter + 1)}
            >
                {!counter || counter === 0
                    ? "Generate " + docPlural
                    : "Regenerate " + docPlural + "?"}
            </Button>
            {!counter && (
                <Text pt={4}  fontSize={"sm"}>
                    After clicking generate, please be patient while your document loads.
                </Text>
            )}
            {counter > 0 && (
                <Text pt={4}  fontSize={"sm"}>
                    If necessary, you can edit your responses and regenerate your{" "}
                    {docPlural}.
                </Text>
            )}
        </Stack>
      <Box
        bg={"gray.100"}
        width={["100%", "80%", "80%"]}
        alignContent={"center"}
        margin={"auto"}
        mb={8}
        p={"8"}
        rounded={"lg"}
      >
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
          mb={4}
        >
          {(Documents === "both" || Documents === "worksheets") && (
            <>
              <Box flex={1}>
                <Heading as={"h3"} fontSize="lg">
                  Child Support Worksheet
                </Heading>
                <Text fontSize={"sm"}>
                  Montana Child Support Worksheet A and any supporting
                  documentation.
                </Text>
              </Box>
              <Box mt={8} flex={1}>
                <Button
                  isDisabled={state === true ? false : true}
                  width="auto"
                  colorScheme="brand"
                  type="button"
                  mr={4}
                >
                  <a
                    className="logo"
                    href={pdf && "data:application/pdf;base64," + pdf.worksheets + ""}
                    download="MontanaChildSupportWorksheet.pdf"
                  >
                    {state === true ? "Download" : loadingMessageDownload}
                  </a>
                </Button>
                <Button
                  isDisabled={state === true ? false : true}
                  width="auto"
                  colorScheme="brand"
                  type="button"
                  onClick={handlePrint('worksheets')}
                >
                  {state === true ? "Print" : loadingMessagePrint}
                </Button>
                {counter > 0 && (
                  <Text mt="2" fontSize={"sm"}>
                    Revision {counter}
                  </Text>
                )}
              </Box>
            </>
          )}
        </Stack>

        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          {(Documents === "both" || Documents === "affadavit") && (
            <>
              <Box flex={1}>
                <Heading as={"h3"} fontSize="lg">
                  Financial affadavit
                </Heading>
                <Text fontSize={"sm"}>
                  Your financial affadivit document and any supporting
                  documentation.
                </Text>
              </Box>
              <Box mt={8} flex={1}>
                <Button
                  isDisabled={state === true ? false : true}
                  width="auto"
                  colorScheme="brand"
                  type="button"
                  mr={4}
                >
                  <a
                    className="logo"
                    href={pdf && "data:application/pdf;base64," + pdf.affadavit + ""}
                    download="MontanaChildSupportFinancialAffidavit.pdf"
                  >
                    {state === true ? "Download" : loadingMessageDownload}
                  </a>
                </Button>
                <Button
                  isDisabled={state === true ? false : true}
                  width="auto"
                  colorScheme="brand"
                  type="button"
                  onClick={handlePrint('affadavit')}
                >
                  {state === true ? "Print" : loadingMessagePrint}
                </Button>
                {counter > 0 && (
                  <Text mt="2" fontSize={"sm"}>
                    Revision {counter}
                  </Text>
                )}
              </Box>
            </>
          )}
        </Stack>
      </Box>

      <Text pl={16} pr={16} mt={4} fontSize="sm">
        Your session will remain active as long as this browser window remains
        open. Click{" "}
        <a href="/" onClick={handleExit}>
          exit interview
        </a>{" "}
        to clear your data and return to the homepage.
      </Text>

        <Text pl={16} pr={16} mt={4} fontSize="sm">
            This is an estimate. The Child Support Calculator was developed in compliance with state guidelines, however, due to programming limitations, this calculation may differ from CSSD’s final determination.  All users of this calculator are encouraged to apply through CSSD.
        </Text>
    </FormizStep>
  )
}
