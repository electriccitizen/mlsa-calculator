import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Heading, Box, Button, Text, Stack } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"
import printJS from "print-js"
import { navigate } from "gatsby"

export const CompleteApp = ({ state, pdf }) => {
  const form = useForm({ subscribe: true })
  const [counter, setCounter] = useState(0)

  const handlePrint = () => {
    if(!pdf) return
    const base64 = pdf.restitution
    printJS({ printable: base64, type: "pdf", base64: true })
  }

  const handleExit = () => {
    setCounter(0)
    navigate("/")
  }

  const loadingMessageDownload = counter > 0 ? "Loading..." : "Download"
  const loadingMessagePrint = counter > 0 ? "Loading..." : "Print"

  return (
    <FormizStep label={"Complete workbook"} name="CompleteApp" order={30000}>
      <SectionHeader header={`Workbook complete`} />
      <Text mb={4} fontSize="lg">
        Your workbook is now complete. Generate your completed workbook below
        for download or printing:
      </Text>
      <Stack mb={8} align={"center"}>
        <Button
            isDisabled={!form.isValid}
            colorScheme={"brand"}
            type={"submit"}
            onClick={() => setCounter(counter + 1)}
        >
          {!counter || counter === 0
              ? "Generate workbook"
              : "Regenerate  workbook?"}
        </Button>
        {counter > 0 && (
            <Text pt={4} width="300px" fontSize={"sm"}>
              If necessary, you can edit your responses and regenerate your{" "}
              workbook.
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
          <>
            <Box flex={1}>
              <Heading
                as={"h3"}
                fontSize="lg"
              >
                Restitution Workbook
              </Heading>
              <Text fontSize={"sm"}>Workbook to track and determine an estimate for proposed restitution.</Text>
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
                  href={pdf && "data:application/pdf;base64," + pdf.restitution + ""}
                  download="MLSA-restitution-worksheet.pdf"
                >
                  {state === true ? "Download" : loadingMessageDownload}
                </a>
              </Button>
              <Button
                isDisabled={state === true ? false : true}
                width="auto"
                colorScheme="brand"
                type="button"
                onClick={handlePrint}
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
    </FormizStep>
  )
}
