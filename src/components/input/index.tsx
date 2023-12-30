import type {TextFieldProps, ValidationResult} from 'react-aria-components';
import {ChangeEventHandler} from 'react';
import {
  FieldError,
  Label,
  Input as ReactAriaInput,
  Text,
} from 'react-aria-components';
import './Input.css';

interface InputProps extends Omit<TextFieldProps, 'onChange' | 'children'> {
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>; // Update the type here
  placeholder?: string;
  slot?: string;
}

export const Input = ({
  label,
  description,
  errorMessage,
  placeholder,
  slot,
  ...props
}: InputProps) => {
  return (
    <div className="input__container">
      <Label className="input__label">{label}</Label>
      <ReactAriaInput
        {...props}
        className="input__field"
        placeholder={placeholder}
        slot={slot}
      />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </div>
  );
};
