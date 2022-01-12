import React from 'react'
import { format, setHours, setMinutes } from 'date-fns'
import { uniq, capitalize } from 'lodash'
import { ContainerTiles, HTile, Tile, TileLabel } from './styled'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Used to display Day tiles when try to schedule a walker
const DateTile = props => {
  const { disabledDays } = props
  const enabled = disabledDays.filter(dd => dd === props.label).length > 0
  return (
    <Tile
      enabled={enabled}
      selected={props.selected}
      onClick={() => {
        if (enabled) props.onClick(props.label)
      }}
    >
      <TileLabel>
        {props.label}
      </TileLabel>
    </Tile>
  )
}

// Used to display Hour tiles when try to schedule a walker
export const HourTile = props => {
  return (
    <HTile
      selected={props.selected}
      onClick={() => {
        props.onClick(props.id)
      }}
    >
      <TileLabel>
        {props.label}
      </TileLabel>
    </HTile>
  )
}

// Display a list of day tiles
export const DateTiles = (props) => {
  let disabledDays = props.walker && props.walker.length > 0 ? uniq(props.walker[0].schedules.map(s => capitalize(s.day_of_week))) : []
  return (
    <ContainerTiles>
      {
        days.map((d, idx) => {
          return (
            <DateTile
              key={idx}
              disabledDays={disabledDays}
              selected={props.value === d}
              onClick={props.onSelectDay}
              label={d}
            />
          )
        })
      }
    </ContainerTiles>
  )
}

// helper function to format hours in a humanize way
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

// Display a list of hour tiles
export const HourTiles = ({ walker, scheduleDay, ...props }) => {
  const scheduledHours = scheduleDay && (walker && walker.length > 0) ? walker[0].schedules.filter(schedule => schedule.day_of_week === scheduleDay.toLowerCase()) : []
  return (
    <ContainerTiles>
      {
        scheduledHours.map((hour, idx) => {
          let fHour = formatHour(hour.start_hour, hour.end_hour)
          return (
            <HourTile
              key={idx}
              disabledDays={[]}
              selected={props.value === hour.id}
              onClick={props.onSelectHour}
              id={hour.id}
              label={`${fHour.start} - ${fHour.end}`}
            />
          )
        })
      }
    </ContainerTiles>
  )
}