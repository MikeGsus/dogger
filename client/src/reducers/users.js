const user = (state = {}, { type, payload }) => {
  switch(type) {
    case 'SET_USER':
      return payload
    case 'GET_USER':
      return state
    case 'RESET' || 'LOG_OUT':
      return {}
    default:
      return state
  }
}

export default user