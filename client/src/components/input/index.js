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
  name,
  onChange,
  type,
  value,
  style,
  ...props
}) => {
  return (
    <InputContainer style={style}>
      <Label>
        { label }
      </Label>
      {
        props.children || (
          <InputElement
            error={error}
            name={name}
            onChange={onChange}
            type={type || 'text'}
            value={value}
          />
        )
      }
      <ErrorLabel>
        { error }
      </ErrorLabel>
    </InputContainer>
  )
}

export default Input