import React from 'react'
import TileSelect from './TileSelect'

export default function SelectRow(props) {
  return (
    <div className="row">
        {props.row.map((tile) => <TileSelect  currentTile={props.currentTile} setCurrentTile={props.setCurrentTile}tileprop={tile}/>)}
    </div>
  )
}
