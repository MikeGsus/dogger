const INITIAL_STATE = {
  scheduleWalks: []
}

export const schedules = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'SET_SCHEDULES_WALKS':
      return {
        ...state,
        scheduleWalks: payload
      }
    default:
      return state
  }
}
