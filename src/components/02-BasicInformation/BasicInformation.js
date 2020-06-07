import React, { useEffect, useState } from 'react'
import { FormizStep, useForm } from '@formiz/core'
import { FieldInput } from '../Fields/FieldInput';
import { FieldRadio } from '../Fields/FieldRadio';
import { Box, SimpleGrid, Flex, Stack } from '@chakra-ui/core'
import { SectionWrapper} from '../SectionWrapper'
import { SectionHeader} from '../SectionHeader'
import { AddressField} from './AddressField'

import statesData from '../../utils/states_hash.json';
export const BasicInformation = ({ updateMontana }) => {
  const form = useForm();
  const [mailing,setMailing] = useState("")
  const updateState = (name,value) => {
    name==='basic.mailing' && setMailing(value)
  }

  //{collection.map(({ id, name }, index) => (

  // const states = [
  //   { key: 1, value: 'admin', label: 'Minnesota' },
  //   { key: 2, value: 'demo', label: 'Montana' },
  // ]
  //
  // let foo = statesData.map((val, i, arr) => {
  //   console.log(val)
  // })


  return (
    <FormizStep name="Basic Information">
      <SectionWrapper>
        <SectionHeader
          header={"What is your name?"}
        />
        <SimpleGrid  mb={8} columns={3} spacing={10}>
          <FieldInput
            name={`basic.fname`}
            label="First Name"
            required="Required"

            m="0"
          />
          <FieldInput
            name={`basic.mname`}
            label="Middle"
            placeholder="Optional"
            m="0"
          />
          <FieldInput
            name={`basic.lname`}
            required="Required"
            label="Last Name"

            m="0"
          />
        </SimpleGrid>
      </SectionWrapper>

      <AddressField
        header={"What is your street address?"}
        label={"Street Address"}
        name={'basic.address'}
      />

      <SectionWrapper>
        <SectionHeader
          header={"Is this your primary mailing address?"}
        />
        <FieldRadio
          name="basic.mailing"
          required="Required"
          updateState={updateState}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
        />
      </SectionWrapper>
      { mailing === "no" &&
        <AddressField
          header={"What is your mailing address?"}
          label={"Mailing Address"}
          name={'basic.mail_address'}
        />

      }
    </FormizStep>
  );
};

// <Box  bg="gray.50" w="100%" p={4} mb={4} >
//   What is the { Pronoun } name?
// </Box>
// <Box flex="2">
//   <FieldInput
//     name={`basic.fname2`}
//     label="First Name"
//     required="Required"
//     placeholder={ Pronoun }
//     m="0"
//   />
// </Box>
// <Box flex="2">
//   <FieldInput
//     name={`basic.mname2`}
//     label="Middle"
//     placeholder="Optional middle name or initial"
//
//     m="0"
//   />
// </Box>
// <Box mb={4} flex="2">
//   <FieldInput
//     name={`basic.lname2`}
//     required="Required"
//     label="Last Name"
//     placeholder="Enter your last name"
//     mt="0"
//   />
// </Box>
// <Box  bg="gray.50" w="100%" p={4} mb={4} >
//   How many minor children do you and [first name] have together? This includes adopted children, but not stepchildren.
// </Box>
// <Box>
//   <FieldSelect
//     name="basic.children"
//     label="Enter a number"
//     placeholder="None"
//
//     keepValue
//     options={[
//       { value: '1', label: '1' },
//       { value: '2', label: '2' },
//       { value: '3', label: '3' },
//       { value: '4', label: '4' },
//       { value: '5', label: '5' },
//       { value: '6', label: '6' },
//       { value: '7', label: '7' },
//       { value: '8', label: '8' },
//     ]}
//   />
//
// </Box>