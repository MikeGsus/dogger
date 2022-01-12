import React from 'react'
import styled from 'styled-components'
import { Title } from '../../containers/dashboard/styled'
import { transformDogs } from '../../utils/hooks/useDogs'
import { DataTable } from '../table'

export const MyDogs = ({ dogState }) => {
  return (
    <Container>
      <TitleContainer>
        <Title>My Dogs</Title>
      </TitleContainer>
      <TableContainer>
        <DataTable
          columns={['photo', 'name', 'breed', 'age']}
          data={dogState?.dogs?.map(transformDogs) ?? []}
          emptyMessage='DOGS NOT FOUND'
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
