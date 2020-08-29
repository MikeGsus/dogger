import React from 'react'
import {
  Label,
  SwitchContainer,
  SwitchElement,
  SwitchLabel,
  SwitchWrapper
} from './styled'

const Switch = ({
  error,
  label,
  name,
  onChange,
  value
}) => {
  return (
    <SwitchContainer>
      <Label>{ label }</Label>
      <SwitchWrapper>
        <SwitchElement
          checked={ value }
          id={ name }
          name={ name }
          onChange={ onChange }
          type="checkbox"
          value={ value }
        />
        <SwitchLabel htmlFor={ name } />
      </SwitchWrapper>
    </SwitchContainer>
  );
};

export default Switch