import React from 'react'
import styled from 'styled-components'
import { Label } from '../input/styled'

export const ModeButton = props => {
  return (
    <Container>
      <Label>
        Selecciona el modo de tu cuenta
      </Label>
      <ButtonsContainer>
        <Button
          onClick={() => {
            props.onPress('owner', true)
            props.onPress('walker', false)
          }}
          selected={!props.owner}
        >
          <Text>
            DUEÑO
          </Text>
        </Button>
        <Button
          onClick={() => {
            props.onPress('owner', false)
            props.onPress('walker', true)
          }}
          selected={!props.walker}
        >
          <Text>
            WALKER
          </Text>
        </Button>
      </ButtonsContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 90%;
  padding: 30px;
  margin-bottom: 20px;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
  margin-top: 20px;
`

const Button = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 30px;
  background-color: ${props => props.selected ? '#5c5f30' : '#D6DD70'};
`

const Text = styled.span`
  font-weight: bold;
  color: #FFFFFF;
`