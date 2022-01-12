import React from 'react'
import { Formik } from 'formik'
import {
  Button,
  Input
} from '../../components'
import { logUpValidation } from '../../validationSchemas'
import {
  Container,
  Title
} from './styled'
import { useAuth } from '../../utils/hooks/useAuth'
import { ModeButton } from '../../components/modeButton'

const initialValues = {
  email: '',
  password: '',
  name: '',
  lastName: '',
  phone: '',
  confirmPassword: '',
  owner: true,
  walker: false
}

const LogUp = () => {
  const auth = useAuth()
  return (
    <Container>
      <Title>Registro</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={logUpValidation}
        onSubmit={auth.createAccount}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          isValid,
          ...formikActions
        }) => (
          <>
            <Input
              error={errors.name}
              label='Nombre(s)'
              name='name'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
            />
            <Input
              error={errors.lastName}
              label='Apellidos'
              name='lastName'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
            />
            <Input
              error={errors.email}
              label='Correo Electronico'
              name='email'
              onBlur={handleBlur}
              onChange={handleChange}
              type='email'
              value={values.email}
            />
            <Input
              error={errors.phone}
              label='Teléfono'
              name='phone'
              onBlur={handleBlur}
              onChange={handleChange}
              type='tel'
              value={values.phone}
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
            <Input
              error={errors.confirmPassword}
              label='Confirmar contraseña'
              name='confirmPassword'
              onBlur={handleBlur}
              onChange={handleChange}
              type='password'
              value={values.confirmPassword}
            />
            <ModeButton onPress={formikActions.setFieldValue} owner={values.owner} walker={values.walker} />
            <Button
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
              wide
            >
              Registrarse
            </Button>
          </>
        )}
      </Formik>
    </Container>
  )
}

export default LogUp