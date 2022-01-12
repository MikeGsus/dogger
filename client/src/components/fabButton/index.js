import React from 'react'
import styled from 'styled-components'

export const FabButton = props => {
  return (
    <FloatingContainer>
      <Button onClick={props.onPress}>
        <Label>
          {props.children}
        </Label>
      </Button>
    </FloatingContainer>
  )
}

FabButton.defaultProps = {
  children: 'OK',
  onPress: () => {}
}

const FloatingContainer = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
`

const Button = styled.div`
  background-color: #D1551A;
  padding: 15px;
  border-radius: 50px;
  cursor: pointer;
`

const Label = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #FFF;
`
