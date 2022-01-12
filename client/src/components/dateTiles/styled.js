import styled from 'styled-components'

export const Tile = styled.div`
  background-color: ${props => props.enabled ? props.selected ? '#D6DD70' : '#5C5F30' : 'gray'};
  padding: 15px;
  border-radius: 12px;
  cursor: ${props => props.enabled ? 'pointer' : 'not-allowed'};
`

export const TileLabel = styled.span`
  font-weight: bold;
  color: #FFF;
`

export const HTile = styled.div`
  background-color: ${props => props.selected ? '#D6DD70' : '#5C5F30'};
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
`

export const ContainerTiles = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  align-self: center;
`
