import React from 'react'
import SelectRow from './SelectRow'
import TileSelect from './TileSelect'

export default function SelectGrid(props) {
  return (
    <>
    {props.tiles.map((tile) => <TileSelect tile={tile}></TileSelect>)}
    {/*props.gridPoints.map((row) => <SelectRow row={row}/>)*/}
    </>
  )
}
