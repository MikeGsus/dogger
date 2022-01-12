import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ENDPOINT = process.env.REACT_APP_API_URL

const BASE_URL = `${ENDPOINT}/api/v1/walkers/`

const walkerSelector = state => state?.walkers ?? []
const userSelector = state => state.users

export function transformWalker (walker) {
  return {
    id: walker.walkerId,
    name: walker.walker.name,
    lastName: walker.walker.last_name,
    phone: walker.walker.phone,
    email: walker.walker.email,
  }
}

export function useWalkers () {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const walkerState = useSelector(walkerSelector)
  const userState = useSelector(userSelector)
  async function getWalkers () {
    setLoading(true)
    try {
      const response = await fetch(BASE_URL, { headers: { Authorization: `Token ${userState.token}` } })
      const walkers = await response.json()
      dispatch({ type: 'SET_WALKERS', payload: walkers })
    } catch (error) {
      window.alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getWalkers()
  // eslint-disable-next-line
  }, [])
  return {
    walkers: walkerState?.walkers ?? [],
    loading
  }
}