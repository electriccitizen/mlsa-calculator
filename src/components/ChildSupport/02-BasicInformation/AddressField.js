import React from "react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldNumberInput } from "../../Fields/FieldNumberInput"
import { FieldSelect } from "../../Fields/FieldSelect"
import { Stack, Box } from "@chakra-ui/react"
import { isNumber } from '@formiz/validations'

export const AddressField = ({ header, label, name }) => {
  return (
    <Box mt={4}>
      <FieldInput name={`${name}.address`} label={label} required="Required" mb={4} />
      <FieldInput
        name={`${name}.address2`}
        label="Line 2, if any (Apt number, P.O. Box, etc.)"
        placeholder="Optional"
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`${name}.city`}
          label="City"
          required="Required"
        />
          <FieldSelect
              name={`${name}.state`}
              label="State"
              placeholder="Select option..."
              required="Required"
              defaultValue="Montana"
              options={[
                  {
                "value": "Alabama",
                "abbreviation": "AL"
            },
            {
                "value": "Alaska",
                "abbreviation": "AK"
            },
            {
                "value": "Arizona",
                "abbreviation": "AZ"
            },
            {
                "value": "Arkansas",
                "abbreviation": "AR"
            },
            {
                "value": "California",
                "abbreviation": "CA"
            },
            {
                "value": "Colorado",
                "abbreviation": "CO"
            },
            {
                "value": "Connecticut",
                "abbreviation": "CT"
            },
            {
                "value": "Delaware",
                "abbreviation": "DE"
            },
            {
                "value": "District Of Columbia",
                "abbreviation": "DC"
            },
            {
                "value": "Florida",
                "abbreviation": "FL"
            },
            {
                "value": "Georgia",
                "abbreviation": "GA"
            },
            {
                "value": "Hawaii",
                "abbreviation": "HI"
            },
            {
                "value": "Idaho",
                "abbreviation": "ID"
            },
            {
                "value": "Illinois",
                "abbreviation": "IL"
            },
            {
                "value": "Indiana",
                "abbreviation": "IN"
            },
            {
                "value": "Iowa",
                "abbreviation": "IA"
            },
            {
                "value": "Kansas",
                "abbreviation": "KS"
            },
            {
                "value": "Kentucky",
                "abbreviation": "KY"
            },
            {
                "value": "Louisiana",
                "abbreviation": "LA"
            },
            {
                "value": "Maine",
                "abbreviation": "ME"
            },
            {
                "value": "Maryland",
                "abbreviation": "MD"
            },
            {
                "value": "Massachusetts",
                "abbreviation": "MA"
            },
            {
                "value": "Michigan",
                "abbreviation": "MI"
            },
            {
                "value": "Minnesota",
                "abbreviation": "MN"
            },
            {
                "value": "Mississippi",
                "abbreviation": "MS"
            },
            {
                "value": "Missouri",
                "abbreviation": "MO"
            },
            {
                "value": "Montana",
                "abbreviation": "MT",
                "selected": true
            },
            {
                "value": "Nebraska",
                "abbreviation": "NE"
            },
            {
                "value": "Nevada",
                "abbreviation": "NV"
            },
            {
                "value": "New Hampshire",
                "abbreviation": "NH"
            },
            {
                "value": "New Jersey",
                "abbreviation": "NJ"
            },
            {
                "value": "New Mexico",
                "abbreviation": "NM"
            },
            {
                "value": "New York",
                "abbreviation": "NY"
            },
            {
                "value": "North Carolina",
                "abbreviation": "NC"
            },
            {
                "value": "North Dakota",
                "abbreviation": "ND"
            },
            {
                "value": "Ohio",
                "abbreviation": "OH"
            },
            {
                "value": "Oklahoma",
                "abbreviation": "OK"
            },
            {
                "value": "Oregon",
                "abbreviation": "OR"
            },
            {
                "value": "Pennsylvania",
                "abbreviation": "PA"
            },
            {
                "value": "Rhode Island",
                "abbreviation": "RI"
            },
            {
                "value": "South Carolina",
                "abbreviation": "SC"
            },
            {
                "value": "South Dakota",
                "abbreviation": "SD"
            },
            {
                "value": "Tennessee",
                "abbreviation": "TN"
            },
            {
                "value": "Texas",
                "abbreviation": "TX"
            },
            {
                "value": "Utah",
                "abbreviation": "UT"
            },
            {
                "value": "Vermont",
                "abbreviation": "VT"
            },
            {
                "value": "Virginia",
                "abbreviation": "VA"
            },
            {
                "value": "Washington",
                "abbreviation": "WA"
            },
            {
                "value": "West Virginia",
                "abbreviation": "WV"
            },
            {
                "value": "Wisconsin",
                "abbreviation": "WI"
            },
            {
                "value": "Wyoming",
                "abbreviation": "WY"
            }
              ]}
          />

        <FieldNumberInput
          name={`${name}.zip`}
          label="Zip code"
          required="Required"
          helper="e.g. 99999"
          format="false"
          validations={[
              {
                  rule: isNumber(),
                  message: 'Please enter a correct postal or zip code',
              },
          ]}
        />
      </Stack>
    </Box>
  )
}
