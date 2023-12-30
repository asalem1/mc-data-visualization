import {Label, RadioGroup as AriaRadioGroup} from 'react-aria-components';
import React from 'react';
import './RadioGroup.css';
import type {ReactNode} from 'react';

type Props = {
  children: ReactNode | ReactNode[];
  isRequired?: boolean;
  label: string;
  onChange: (value: any) => void;
  value: string;
};

export function RadioGroup({
  children,
  isRequired = false,
  label,
  onChange,
  value,
}: Props) {
  return (
    <AriaRadioGroup
      className="radio-group__container"
      isRequired={isRequired}
      onChange={onChange}
      value={value}
    >
      <Label className="radio-group__label">{label}</Label>
      {children}
    </AriaRadioGroup>
  );
}
