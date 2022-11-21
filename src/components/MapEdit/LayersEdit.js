import React, { useState } from "react";
import { Box,List, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, ListItem, ToggleButton, ToggleButtonGroup} from "@mui/material";

import "./mapEdit.css"

  
export default function LayersEdit(props) {
    const [erase, toggleErase] = useState(false);
    const setErase = (event, newState) => {
        toggleErase(newState);
        props.setErase(newState);
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
        </List>
        
    </Box>
    
        

    
</table>

    </>
    
 );
}