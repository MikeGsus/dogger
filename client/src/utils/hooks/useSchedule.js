import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize } from 'lodash'
import { formatHour } from '../../components/dateTiles'

const ENDPOINT = https://fierce-bastion-86846.herokuapp.com

const BASE_PATH = `${ENDPOINT}/api/v1/scheduled-walks/`

const scheduleSelector = state => state.schedules

export function transformScheduleWalk (scheduleWalk) {
  let fHour = formatHour(scheduleWalk.schedule.start_hour, scheduleWalk.schedule.end_hour)
  return {
    dog: `${scheduleWalk.dog.name} - ${scheduleWalk.dog.age} yrs`,
    walker: `${scheduleWalk.walker.walker.name} ${scheduleWalk.walker.walker.last_name} // ${scheduleWalk.walker.walker.phone}`,
    schedule: `Walk on ${capitalize(scheduleWalk.schedule.day_of_week)} from ${fHour.start} to ${fHour.end}`
  }
}

export function transformScheduleWalkForWalker (scheduleWalk) {
  let fHour = formatHour(scheduleWalk.schedule.start_hour, scheduleWalk.schedule.end_hour)
  return {
    dog: `${scheduleWalk.dog.name} - ${scheduleWalk.dog.age} yrs`,
    owner: `${scheduleWalk.dog.owner.name} ${scheduleWalk.dog.owner.last_name} - ${scheduleWalk.dog.owner.phone}`,
    schedule: `Walk on ${capitalize(scheduleWalk.schedule.day_of_week)} from ${fHour.start} to ${fHour.end}`
  }
}

export function useSchedule () {
  const dispatch = useDispatch()
  const scheduleState = useSelector(scheduleSelector)
  const user = useSelector(state => state.users)
  async function getScheduleWalks () {
    try {
      const response = await fetch(
        `${ENDPOINT}/api/v1/users/${user.user.id}/scheduleWalks`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Token ${user.token}`
          }
        }
      )
      const scheduleWalks = await response.json()
      dispatch({ type: 'SET_SCHEDULES_WALKS', payload: scheduleWalks })
    } catch (error) {
      window.alert(error.message)
    }
  }
  async function createScheduleWalk (body, callback = () => {}) {
    try {
      const response = await fetch(
        BASE_PATH,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Token ${user.token}`
          },
          body: JSON.stringify(body)
        }
      )
      const scheduleWalk = await response.json()
      if (scheduleWalk && scheduleWalk.id) {
        getScheduleWalks()
        callback()
      }
    } catch (error) {
      window.alert(error.message)
    }
  }
  useEffect(() => {
    getScheduleWalks()
    // eslint-disable-next-line
  }, [])
  return {
    getScheduleWalks,
    createScheduleWalk,
    scheduleWalks: scheduleState?.scheduleWalks ?? []
  }
}