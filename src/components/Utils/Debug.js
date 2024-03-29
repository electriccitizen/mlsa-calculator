import React from 'react';
import { useForm } from '@formiz/core';
import { Box } from '@chakra-ui/react';

const propTypes = {};
const defaultProps = {};

export const Debug = () => {
  const form = useForm();

  return (
    <Box
      data-test="debug"
      as="pre"
      fontSize="xs"
      flex="1"
    >
      <Box fontSize="sm" color="gray.400">
        # Debug - Form values
      </Box>
      {JSON.stringify(form.values, null, 2)}
    </Box>
  );
};

Debug.propTypes = propTypes;
Debug.defaultProps = defaultProps;
