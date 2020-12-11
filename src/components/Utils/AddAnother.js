import React from "react"
import PropTypes from "prop-types"
import { Box, useColorMode, IconButton, Stack } from "@chakra-ui/react"
import { FaTrashAlt } from "react-icons/fa"
const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

export const AddAnotherHeader = ({ header }) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      borderRadius="lg"
      width="95%"
      bg={colorMode === 'dark' ? "gray.600" : "gray.200"}
      color={colorMode === 'dark' ? "gray.200" : "gray.900"}
      fontSize={"md"}
      p={4}
      mb={2}
    >
      {header}
    </Box>
  )
}

export const AddAnother = ({
  removeItem,
  expenseID,
  expense,
  amount,
  note,
  note2,
  receipt,
  index,
}) => {
  const { colorMode } = useColorMode()
  return (
    <Box d="flex" alignItems="center">
      <Box
        key={index}
        spacing="4"
        mb="6"
        backgroundColor={colorMode === "dark" ? "gray.800" : "gray.200"}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={colorMode === "dark" ? "gray.900" : "gray.200"}
        p="4"
        width={"95%"}
      >
        <>
          <Stack direction={{ xs: "column", md: "row" }}>
            <Box flex={1} pr={8}>
              {expense}
            </Box>
            <Box flex={1}>{amount}</Box>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }}>
            <Box flex={1} pr={8}>
              {note}
            </Box>
            {receipt && (
              <Box width={"42%"} pt={2}>
                {receipt}
              </Box>
            )}
            {note2 && <Box flex={1}>{note2}</Box>}
          </Stack>
        </>
      </Box>
      <Box mt="-12" width={"5%"} pt="1.75rem">
        <IconButton
          icon={<FaTrashAlt />}
          onClick={() => removeItem(expenseID)}
          variant="ghost"
        />
      </Box>
    </Box>
  )
}

AddAnother.propTypes = propTypes
AddAnother.defaultProps = defaultProps
