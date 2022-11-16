import React from "react";
import { Box,Button, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";

import "./tileEdit.css"

  
export default function LayersEdit(props) {
    const [erase, toggleErase] = React.useState(props.erase);

    const setErase = (event, newState) => {
        toggleErase(newState);
        props.setErase(newState);
        console.log(newState)
    }
    const setBrushSize = (event) => {
        props.changeBrushSizeCallback(event.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
          setBrushSize(e);
        }
      }
    let brushEraseLabel=()=>{
        if(erase==true) return "Eraser size"
        else return "Brush size"
    }
    
 return (
    <>
    
    <table class="layers-table">
    <thead>
        <tr>
            <th>Tools</th>
            <th></th>
        </tr>
    </thead>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
            <ListItem>
            <ToggleButtonGroup
                value={erase}
                exclusive
                onChange={setErase}
                color="success"
            >
                <ToggleButton value={false}>Draw</ToggleButton>
                <ToggleButton value={true}>Erase</ToggleButton>
                
            </ToggleButtonGroup>
            </ListItem>
            <ListItem>
                <TextField label={brushEraseLabel()} variant="outlined"  size="small" defaultValue={props.defaultBrush} 
                onKeyDown={handleKeyDown} onBlur={setBrushSize}/>
            </ListItem>
        </List>
        
    </Box>
    
        

    
</table>

    </>
    
 );
}