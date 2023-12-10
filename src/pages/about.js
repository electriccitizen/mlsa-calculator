import React from "react"
import { Heading, Text, Box } from "@chakra-ui/react"

import { PageLayout } from "../layout/PageLayout"

export default function About() {
  return (
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
          About Montana Legal Services Association
        </Heading>
        <Text mb={"4"}>
          These tools, the Child Support Calculator and Restitution Workbook, are provided by Montana Legal Services Association.
        </Text>
        <Text mb={"4"}>
          For over fifty years, the Montana Legal Services Association has helped ensure fairness for all in Montana’s justice system by providing civil, non-criminal legal services to low income Montanans. MLSA’s mission is to protect and enhance the civil legal rights of, and promote systemic change for, Montanans living in poverty.
        </Text>
        <Text mb={"4"}>
          MLSA received one of three sub awards from the National Crime Victim Law Institute (NCVLI) to use technology to increase legal access to rural crime victims through its Rural Crime Victim Access Project, a cooperative agreement with the Department of Justice Office for Victims of Crime. The goal of Rural Crime Victim Access is to use technology to provide direct legal access to survivors in some of the most under served areas of the state.
        </Text>
      </Box>
    </PageLayout>
  )
}
