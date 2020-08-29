import React from 'react'
import {
  ErrorLabel,
  InputElement,
  InputContainer,
  Label
} from './styled'

const Input = ({
  error,
  label,
  maxLength,
  name,
  onChange,
  type,
  value
}) => {
  return (
    <InputContainer>
      <Label>
        { label }
      </Label>
      <InputElement
        maxLength={maxLength || 500}
        name={name}
        onChange={onChange}
        type={type || 'text'}
        value={value}
      />
      <ErrorLabel>
        { error }
      </ErrorLabel>
    </InputContainer>
  )
}

export default Input