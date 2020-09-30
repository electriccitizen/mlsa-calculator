import React from "react"
import { Heading, Text, Box } from "@chakra-ui/core"

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
          These tools, the Child Support Calculator and Restitution Workbook,
          are provided by Montana Legal Services Association and its MT Victim
          Legal Assistance Network (MT VLAN).
        </Text>
        <Text mb={"4"}>
          For over fifty years, the Montana Legal Services Association has
          helped ensure fairness for all in Montana’s justice system by
          providing civil, non-criminal legal services to low income Montanans.
          MLSA’s mission is to protect and enhance the civil legal rights of,
          and promote systemic change for, Montanans living in poverty.
        </Text>
        <Text mb={"4"}>
          MLSA received one of three subawards from the National Crime Victim
          Law Institute (NCVLI) to use technology to increase legal access to
          rural crime victims through its Rural Crime Victim Access Project, a
          cooperative agreement with the Department of Justice Office for
          Victims of Crime. The goal of Rural Crime Victim Access is to use
          technology to provide direct legal access to survivors in some of the
          most underserved areas of the state.
        </Text>
        <Text mb={"4"}>
          VLAN, part of Montana Legal Services Association, provides civil legal
          aid and other support services to crime victims in Montana.  Partners
          include the Montana Board of Crime Control, Montana Coalition against
          Domestic and Sexual Violence, Montana Department of Justice - Office
          for Victim Services, and various crime victim service providers
          throughout the state.
        </Text>
        <Text mb={"4"}>
          MT VLAN is a statewide civil legal assistance network that provides
          coordinated, comprehensive, and holistic wrap-around services to crime
          victims across the state. {" "}
        </Text>
        <Text mb={"4"}>
          MT VLAN offers civil legal advice and representation, advocacy for
          victim’s rights and safety, support and referrals, and access to legal
          information and resources to victims of crime, while also developing
          new online technology tools to assist victims and service providers.
        </Text>
      </Box>
    </PageLayout>
  )
}
