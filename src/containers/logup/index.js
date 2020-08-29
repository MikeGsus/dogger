import React from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { createUser } from '../../actions/users'
import {
  Button,
  Input,
  Switch
} from '../../components'
import { logUpValidation } from '../../validationSchemas'
import {
  Container,
  SwitchContainer,
  Title
} from './styled'

const initialValues = {
  email: '',
  password: '',
  name: '',
  lastName: '',
  phone: '',
  address: '',
  confirmPassword: '',
  owner: true,
  walker: false
}

const LogUp = (props) => {
  const { createUser } = props
  return (
    <Container>
      <Title>Registro</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={logUpValidation}
        onSubmit={(props) => {
          console.log('formik props >>>', props)
          createUser()
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          isValid,
          setValues
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
              label='Correo'
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
              maxLength={10}
            />
            <Input
              error={errors.address}
              label='Direción'
              name='address'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
            />
            <SwitchContainer>
              <h4>¿Cómo deseas registrarte?</h4>
              <Switch
                label='Dueño de un perro'
                name='owner'
                onChange={() => {
                  setValues({
                    ...values,
                    owner: !values.owner,
                    walker: !values.walker
                  }, false)
                }}
                value={values.owner}
              />
              <Switch
                label='Paseador'
                name='walker'
                onChange={() => {
                  setValues({
                    ...values,
                    owner: !values.owner,
                    walker: !values.walker
                  }, false)
                }}
                value={values.walker}
              />
            </SwitchContainer>
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

const MapDispatchToProps = (dispatch) => ({
  createUser: () => dispatch(createUser())
})

export default connect(null, MapDispatchToProps)(LogUp)