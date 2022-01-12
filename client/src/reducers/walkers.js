const INITIAL_STATE = {
  walkers: []
}

export const walkers = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_WALKERS':
      return {
        ...state,
        walkers: payload
      }
    default:
      return state
  }
}