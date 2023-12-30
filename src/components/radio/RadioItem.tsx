import {Radio} from 'react-aria-components';
import React from 'react';
import './RadioItem.css';

type Props = {
  description: string;
  isDisabled?: boolean;
  name: string;
  value: string;
};

export function RadioItem({
  description,
  isDisabled = false,
  name,
  value,
}: Props) {
  return (
    <Radio
      value={value}
      isDisabled={isDisabled}
      className={({isFocusVisible, isSelected, isPressed}) => `
      radio-group__item
      ${isFocusVisible ? 'focused' : ''}
      ${isSelected ? 'selected' : 'not-selected'}
      ${isPressed && !isSelected ? 'pressed' : ''}
      ${!isSelected && !isPressed ? 'inactive' : ''}
    `}
    >
      <div>
        <div className="radio-group__detail-name">{name}</div>
        <div className="radio-group__detail-text">{description}</div>
      </div>
    </Radio>
  );
}
