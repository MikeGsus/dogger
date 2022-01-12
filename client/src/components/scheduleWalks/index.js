import React from 'react'
import styled from 'styled-components'
import { Title } from '../../containers/dashboard/styled'
import { DataTable } from '../table'

// Display a table of ScheduleWalks for both type of users (Owner, Walker)
export const ScheduleWalks = ({ scheduleState, ...props }) => {
  return (
    <Container>
      <TitleContainer>
        <Title>{props.title || 'Schedule Walks'}</Title>
      </TitleContainer>
      <TableContainer>
        <DataTable
          columns={props.columns}
          data={scheduleState.scheduleWalks.map(props.transform)}
          emptyMessage='WALKS NOT FOUND'
        />
      </TableContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 20px;
`

const TitleContainer = styled.div`
  margin-bottom: 10px;
`

const TableContainer = styled.div`
  max-height: 300px;
  overflow: scroll;
`