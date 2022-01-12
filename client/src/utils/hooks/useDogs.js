import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ENDPOINT = process.env.REACT_APP_API_URL

const BASE_URL = `${ENDPOINT}/api/v1/users`

const dogSelector = state => state.dogs
const userSelector = state => state.users

export function transformDogs (dog) {
  return {
    id: dog.id,
    age: dog.age,
    breed: dog.breed.name,
    photo: dog.photo || null,
    name: dog.name
  }
}

export function useDogs () {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const dogsState = useSelector(dogSelector)
  const userState = useSelector(userSelector)
  async function getDogs () {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/${userState.user.id}/dogs/`, { headers: { Authorization: `Token ${userState.token}` } })
      const dogs = await response.json()
      dispatch({ type: 'SET_DOGS', payload: dogs })
    } catch (error) {
      window.alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  async function getBreeds () {
    setLoading(true)
    try {
      const response = await fetch(`${ENDPOINT}/api/v1/breeds/`)
      const breeds = await response.json()
      dispatch({ type: 'SET_DOG_BREEDS', payload: breeds })
    } catch (error) {
      window.alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDogs()
    getBreeds()
    // eslint-disable-next-line
  }, [])
  return {
    dogs: dogsState.dogs,
    loading,
  }
}