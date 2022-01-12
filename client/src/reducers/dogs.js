const INITIAL_STATE = {
  dogs: [],
  breeds: []
}

const dogs = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_DOGS':
      return {
        ...state,
        dogs: payload
      }
    case 'SET_DOG_BREEDS':
      return {
        ...state,
        breeds: payload
      }
    case 'LOG_OUT':
      return INITIAL_STATE
    default:
      return state
  }
}

export default dogs
