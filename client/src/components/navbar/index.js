import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { Button } from '../'
import {
  ButtonsContainer,
  Container,
  Logo,
  Title,
  TitleContainer
} from './styled'

const Navbar = (props) => {
  const dispatch = useDispatch()
  const { isLogged } = props
  function onLogOut () {
    dispatch({ type: 'LOG_OUT' })
  }
  return (
    <Container>
      <TitleContainer>
        <Logo src={require('../../assets/img/png/logo/dogger_icon.png')} alt='Logo' />
        <Link to="/" style={{ textDecoration: 'none'}}>
          <Title>
            Dogger
          </Title>
        </Link>
      </TitleContainer>
      { !isLogged ?
        (
          <ButtonsContainer>
            <Link to="/log-up">
              <Button>
                Registrarse
              </Button>
            </Link>
            <Link to="/log-in">
              <Button secondary>
                Iniciar sesión
              </Button>
            </Link>
          </ButtonsContainer>
        ) : (
          <Link to='/'>
            <Button onPress={onLogOut} secondary>
              Cerrar Sesión
            </Button>
          </Link>
        )
      }
    </Container>
  )
}

const mapStateToProps = ({ account }) => ({
  isLogged: account.isLogged
})

export default connect(mapStateToProps)(Navbar)