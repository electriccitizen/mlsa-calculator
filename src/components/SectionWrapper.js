import React, { useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, Flex } from '@chakra-ui/core';
import { Debug } from '../components/Debug';
import { useDarkTheme } from '../hooks/isDarkTheme';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: '',
};

const useDebugTime = () => {
  const initRenderTimeRef = useRef(new Date());
  const preRenderTimeRef = useRef(new Date());
  preRenderTimeRef.current = new Date();

  useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('--- Page mounted ---');
  }, []);

  useEffect(() => {
    const currentTime = new Date();
    // eslint-disable-next-line no-console
    console.log(
      `Rendered in ${(currentTime - preRenderTimeRef.current) / 1000}s`,
      '-',
      `Mounted ${(currentTime - initRenderTimeRef.current) / 1000}s ago`,
    );
  });
};

export const SectionWrapper = ({ children }) => {
  useDebugTime();
  const isDarkTheme = useDarkTheme();

  return (
          <Box mb={8} >
            {children}
          </Box>
  );
};

SectionWrapper.propTypes = propTypes;
SectionWrapper.defaultProps = defaultProps;
