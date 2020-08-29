import {
  startLoading,
  stopLoading
} from './ui'

const URL_BASE = process.env.REACT_APP_SERVER_URL

export const createUser = (data) => {
  return (dispatch) => {
    dispatch(startLoading())
    console.log('url >>>', URL_BASE)
    dispatch(stopLoading())
  }
}