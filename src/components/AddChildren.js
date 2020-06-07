import React, { useState, useEffect } from 'react';
import { FormizStep, useForm } from '@formiz/core';
import {
  IconButton, Box, Stack,
} from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { FieldInput } from './Fields/FieldInput';
import { AddPlaceholder } from './AddPlaceholder';

export const AddChildren = () => {
  const form = useForm();
  const [exposedPorts, setExposedPorts] = useState([]);

  useEffect(() => {
    setExposedPorts([]);
  }, [form.resetKey]);

  const addItem = () => {
    setExposedPorts((s) => [
      ...s,
      {
        id: uuidv4(),
      },
    ]);
  };

  const removeItem = (id) => {
    setExposedPorts((s) => s.filter((x) => x.id !== id));
  };

  return (
    <FormizStep name="exposedPorts">
      <Box  bg="gray.50" w="100%" p={4} mb={4} >
        Enter the details for each of your children
      </Box>
      {exposedPorts.map((port, index) => (
        <Stack
          key={port.id}
          isInline
          spacing="4"
          mb="6"
          backgroundColor='gray.50'
          rounded="md"
          borderWidth="1px"
          borderColor='gray.200'
          p="4"
        >
          <Box flex="1">
            <FieldInput
              name={`children[${index}].fname`}
              label="First name"
              required="Required"
              placeholder="Enter first name"
              type="text"
              m="0"
              // validations={[
              //   {
              //     rule: (val) => (form.values.ports || [])
              //       .filter((x) => x.number === val).length <= 1,
              //     deps: [JSON.stringify(form.values.ports)],
              //     message: 'Must be unique',
              //   },
              // ]}
            />
          </Box>
          <Box flex="1">
            <FieldInput
              name={`children[${index}].lname`}
              label="Last name"
              required="Required"
              placeholder="Enter last name"
              type="text"
              m="0"
              // validations={[
              //   {
              //     rule: (val) => (form.values.ports || [])
              //       .filter((x) => x.number === val).length <= 1,
              //     deps: [JSON.stringify(form.values.ports)],
              //     message: 'Must be unique',
              //   },
              // ]}
            />
          </Box>
          <Box pt="1.75rem">
            <IconButton
              icon="delete"
              onClick={() => removeItem(port.id)}
              variant="ghost"
            />
          </Box>
        </Stack>
      ))}
      {exposedPorts.length <= 20 && (
        <AddPlaceholder label="Add child" onClick={addItem} />
      )}
    </FormizStep>
  );
m;
