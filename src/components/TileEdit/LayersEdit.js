import React from "react";
import { Box, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";

import "./tileEdit.css"

  
export default function LayersEdit(props) {
    const [erase, toggleErase] = React.useState(props.erase);

    const setErase = (event, newState) => {
        toggleErase(newState);
        props.setErase(newState);
    }
    const setBrushSize = (event) => {
        props.changeBrushSizeCallback(event.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
          setBrushSize(e);
        }
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
            >
                <ToggleButton value={false}>Draw</ToggleButton>
                <ToggleButton value={true}>Erase</ToggleButton>
            </ToggleButtonGroup>
            </ListItem>
            <ListItem>
                <TextField label="Brush Size" variant="outlined" defaultValue={props.defaultBrush} 
                onKeyDown={handleKeyDown} onBlur={setBrushSize}/>
            </ListItem>
        </List>
    </Box>
    
        

    
</table>

    </>
    
 );
}