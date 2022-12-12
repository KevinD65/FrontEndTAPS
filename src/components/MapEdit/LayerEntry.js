import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function (props) {
    const changeName = (event) => {
        props.changeNameCallback(props.index, event.target.value);
    }
  return (
    <Box sx={{display:'flex' }} >
        <TextField sx={{bgcolor: 'background.paper'}}variant="outlined" size="small" defaultValue={props.name} onBlur={changeName}/>
        <KeyboardArrowUpIcon onClick={(() => props.swapUp(props.index))}/>
        <KeyboardArrowDownIcon onClick={(() => props.swapDown(props.index))}/>
        <DeleteIcon onClick={() => props.deleteLayer(props.id)}/>
    </Box>
  )
}
