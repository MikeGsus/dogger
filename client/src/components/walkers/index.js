import React from 'react'
import styled from 'styled-components'
import { Title } from '../../containers/dashboard/styled'
import { transformWalker } from '../../utils/hooks/useWalkers'
import { DataTable } from '../table'

export const Walkers = ({ walkerState }) => {
  return (
    <Container>
      <TitleContainer>
        <Title>Walkers</Title>
      </TitleContainer>
      <TableContainer>
        <DataTable
          columns={['name', 'lastName', 'email', 'phone']}
          data={walkerState.walkers.map(transformWalker)}
          emptyMessage='WALKERS NOT FOUND'
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
