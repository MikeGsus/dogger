import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const ENDPOINT = process.env.REACT_APP_API_URL

export function useAuth () {
  const dispatch = useDispatch()
  const history = useHistory()
  async function loginWithEmailAndPassword (body, formikActions) {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      )
      const json = await response.json()
      if (json && json.token) {
        dispatch({ type: 'SET_USER', payload: json })
        dispatch({ type: 'LOG_IN' })
        history.push('/dashboard')
      }
      if (json && json.non_field_errors) {
        window.alert(json.non_field_errors[0])
      }
    } catch (error) {
      window.alert(error.message)
    }
  }
  async function createAccount (account, formikActions) {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/v1/users/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: account.email,
            name: account.name,
            last_name: account.lastName,
            phone: account.phone,
            password: account.password,
            confirmPassword: account.confirmPassword,
            owner: account.owner,
            walker: account.walker,
          })
        }
      )
      const json = await response.json()
      if (json && json.token) {
        dispatch({ type: 'SET_USER', payload: json })
        dispatch({ type: 'LOG_IN' })
        history.push('/dashboard')
      }
      if (json && json.non_field_errors) {
        window.alert(json.non_field_errors[0])
      }
    } catch (error) {
      window.alert(error.message)
    }
  }
  return {
    loginWithEmailAndPassword,
    createAccount
  }
}
