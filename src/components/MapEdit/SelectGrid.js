import React from 'react'
import SelectRow from './SelectRow'

export default function SelectGrid(props) {
  return (
    <>
    {props.gridPoints.map((row) => <SelectRow row={row}  currentTile={props.currentTile} setCurrentTile={props.setCurrentTile}/>)}
    </>
  )
}
