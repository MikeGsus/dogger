import React from 'react'

export const DataTable = props => {
  return (
    <>
      <table>
        <tr>
          {
            props.columns.map(column => {
              return (
                <th key={column + Math.random()} style={{ position: 'sticky', top: 0 }}>{column}</th>
              )
            })
          }
        </tr>
        <tbody>
          {
            props.data.map(d => {
              return (
                <tr key={d.id}>
                  {
                    props.columns.map(column => {
                      return <td key={column + d.id}>{d[column] || 'N/A'}</td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        props.data.length === 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
            <h3 style={{ fontWeight: 'bold', color: '#D1551A' }}>
              {props.emptyMessage}
            </h3>
          </div>
        )
      }
    </>
  )
}