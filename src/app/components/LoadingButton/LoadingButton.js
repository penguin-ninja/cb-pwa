import React from 'react';
import Button from 'react-bootstrap/lib/Button';

const LoadingButton = ({
  isLoading,
  label,
  loadingLabel,
  disabled,
  ...props
}) => (
  <Button {...props} disabled={isLoading || disabled}>
    {isLoading && <i className="fa fa-circle-o-notch fa-spin" />}
    {isLoading ? ` ${loadingLabel}` : label}
  </Button>
);

export default LoadingButton;
