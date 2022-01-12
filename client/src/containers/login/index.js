import React from 'react'
import { Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logInValidation } from '../../validationSchemas'
import {
  Container,
  FormContainer,
  Logo,
  Title
} from './styled'
import { useAuth } from '../../utils/hooks/useAuth'

const initialValues = {
  email: '',
  password: ''
}

const LogIn = () => {
  const auth = useAuth()
  return (
    <Container>
      <Logo src={require('../../assets/img/png/logo/dogger_logo.png')} alt='Dogger' />
      <FormContainer>
        <Title>Iniciar Sesión</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={logInValidation}
          onSubmit={auth.loginWithEmailAndPassword}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            isValid
          }) => (
            <>
              <Input
                error={errors.email}
                label='Correo'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
                value={values.email}
              />
              <Input
                error={errors.password}
                label='Contraseña'
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                type='password'
                value={values.password}
              />
              <Button
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                wide
              >
                Entrar
              </Button>
            </>
          )}
        </Formik>
      </FormContainer>
    </Container>
  )
}

export default LogIn