import React from 'react'
import {
  ButtonContainer,
  Text
} from './styled'

const Button = ({
  children,
  disabled,
  onPress,
  secondary,
  wide,
  style
}) => {
  return (
    <ButtonContainer
      disabled={disabled}
      onClick={onPress}
      secondary={secondary}
      type='button'
      wide={wide}
      style={style}
    >
      <Text
        secondary={secondary}
        wide={wide}
      >
        { children }
      </Text>
    </ButtonContainer>
  )
}

export default Button