import React from "react";
import { Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography} from "@mui/material";

import "./tileEdit.css"

  
export default function LayersEdit() {
 return (
    <>
    
    <table class="layers-table">
    
    <thead>
        <tr>
            <th>Layers</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Detail</td>
            <td><Checkbox defaultChecked /></td>
        </tr>
        <tr class="active-row">
        <td>Accent</td>
            <td><Checkbox  defaultChecked /></td>
            
    
        </tr>
        <tr>
            <td>Base color</td>
            
            <td><Checkbox  defaultChecked /></td>
            
        </tr>


        {/*temporary UI for adding and removing layers (required feature)*/}
        <tr>
            <th>Layer Functions</th>          
        </tr>

        <tr>
            <td><button> add </button> <button> remove </button></td>
        </tr>


    </tbody>
</table>
    
    </>
    
 );
}