/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { PseudoBox } from '@chakra-ui/core';
import { useDarkTheme } from '../hooks/isDarkTheme';

const propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(['left', 'right']),
  to: PropTypes.string,
};
const defaultProps = {
  children: '',
  direction: 'left',
  to: null,
};

export const MenuItem = ({
  children, direction, to, ...props
}) => {
  const isDarkTheme = useDarkTheme();
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <PseudoBox
      as={Link}
      to={to}
      px="5"
      py="1"
      mr="-1px"
      fontWeight="bold"
      borderLeft={direction === 'left' ? '3px solid transparent' : null}
      borderRight={direction === 'right' ? '3px solid transparent' : null}
      borderColor={isActive
        ? (isDarkTheme ? 'gray.200' : 'gray.700')
        : null}
      color={isActive
        ? (isDarkTheme ? 'gray.200' : 'gray.700')
        : (isDarkTheme ? 'gray.400' : 'gray.500')}
      transition="0.2s"
      textAlign={direction === 'left' ? 'left' : 'right'}
      _hover={{
        textDecoration: 'none',
        color: isDarkTheme ? 'gray.200' : 'gray.700',
        borderColor: !isActive ? 'gray.300' : null,
      }}
      _focus={{
        outline: 'none',
        color: isDarkTheme ? 'gray.200' : 'gray.700',
      }}
      {...props}
    >
      {children}
    </PseudoBox>
  );
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
