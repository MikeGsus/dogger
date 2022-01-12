import React from 'react'
import { Input } from '../index'
import { get } from 'lodash'

export const Selector = props => {
  return (
    <Input
      error={props.error}
      label={props.label}
      name={props.name}
      style={{ padding: '1%', width: '98%' }}
    >
      <select onChange={props.onSelect}>
        <option
          selected={!props.value}
          value={0}
        >
          {props.placeholder}
        </option>
        {
          props.data.map(d => {
            return (
              <option
                selected={props.value === d.id}
                value={d.id}
              >
                {get(d, props.field)}
              </option>
            )
          })
        }
      </select>
    </Input>
  )
}

Selector.defaultProps = {
  onSelect: () => {},
  error: '',
  label: 'Select a Breed',
  name: 'breed',
  data: [],
  field: 'name'
}