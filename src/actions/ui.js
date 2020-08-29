export const startLoading = () => {
  return (dispatch) => {
    dispatch({
      type: 'START_LODING'
    })
  }
}

export const stopLoading = () => {
  return (dispatch) => {
    dispatch({
      type: 'STOP_LOADING'
    })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET'
    })
  }
}