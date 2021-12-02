import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const propTypes = {
  children: PropTypes.node,
  errorMessage: PropTypes.node,
  helper: PropTypes.node,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  showError: PropTypes.bool,
};
const defaultProps = {
  children: '',
  errorMessage: '',
  helper: '',
  isRequired: false,
  label: '',
  showError: false,
};

export const FormGroup = ({
  children,
  errorMessage,
  helper,
  id,
  isRequired,
  label,
  showError,
  ...props
}) => (
  <FormControl mb="6" isInvalid={showError} isRequired={isRequired}>
    {!!label && (
      <FormLabel htmlFor={id}>
        {label}
      </FormLabel>
    )}

    {children}
    {!!helper && (
      <FormHelperText dangerouslySetInnerHTML={{__html: helper}} />
    )}
    <FormErrorMessage id={`${id}-error`}>
      { errorMessage }
    </FormErrorMessage>
  </FormControl>
);

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;
