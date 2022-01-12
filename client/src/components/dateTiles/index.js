import React from 'react'
import { format, setHours, setMinutes } from 'date-fns'
import { uniq, capitalize } from 'lodash'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const DateTile = props => {
  const { disabledDays } = props
  const enabled = disabledDays.filter(dd => dd === props.label).length > 0
  return (
    <div
      style={{
        backgroundColor: enabled ? props.selected ? '#D6DD70' : '#5C5F30' : 'gray',
        padding: 15,
        borderRadius: 12,
        cursor: enabled ? 'pointer' : 'not-allowed'
      }}
      onClick={() => {
        if (enabled) props.onClick(props.label)
      }}
    >
      <span style={{ fontWeight: 'bold', color: '#FFF' }}>
        {props.label}
      </span>
    </div>
  )
}

export const HourTile = props => {
  return (
    <div
      style={{
        backgroundColor: props.selected ? '#D6DD70' : '#5C5F30',
        padding: 15,
        borderRadius: 12,
        cursor: 'pointer'
      }}
      onClick={() => {
        props.onClick(props.id)
      }}
    >
      <span style={{ fontWeight: 'bold', color: '#FFF' }}>
        {props.label}
      </span>
    </div>
  )
}

export const DateTiles = (props) => {
  let disabledDays = props.walker && props.walker.length > 0 ? uniq(props.walker[0].schedules.map(s => capitalize(s.day_of_week))) : []
  return (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: 20, alignSelf: 'center' }}
    >
      {
        days.map((d, idx) => {
          return <DateTile key={idx} disabledDays={disabledDays} selected={props.value === d} onClick={props.onSelectDay} label={d} />
        })
      }
    </div>
  )
}

export function formatHour (start, end) {
  const [sH] = start.split(':')
  const [eH] = end.split(':')
  return {
    start: format(
      setMinutes(
        setHours(
          new Date(),
          sH
        ),
        0
      ),
      'HH:mm aa'
    ),
    end: format(
      setMinutes(
        setHours(
          new Date(),
          eH
        ),
        0
      ),
      'HH:mm aa'
    ),
  }
}

export const HourTiles = ({ walker, scheduleDay, ...props }) => {
  const scheduledHours = scheduleDay && (walker && walker.length > 0) ? walker[0].schedules.filter(schedule => schedule.day_of_week === scheduleDay.toLowerCase()) : []
  return (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: 20, alignSelf: 'center' }}
    >
      {
        scheduledHours.map((hour, idx) => {
          let fHour = formatHour(hour.start_hour, hour.end_hour)
          return <HourTile key={idx} disabledDays={[]} selected={props.value === hour.id} onClick={props.onSelectHour} id={hour.id} label={`${fHour.start} - ${fHour.end}`} />
        })
      }
    </div>
  )
}