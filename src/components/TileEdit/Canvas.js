import React from 'react';
import CanvasDraw from "./index.js";

export default function Canvas(props) {
    console.log("Size is", props.canvasWidth, props.canvasHeight);
    const handleExport = () => {
        
        //setDrawing(canvasRef.current.canvasContainer.childNodes[1].toDataURL())
     
        

      };
  return (
    <>
    <button
        type="button"
        style={{ backgroundColor: "#0A71F1", color: "white" }}
        onClick={handleExport}
      >
        Save
      </button>
    <CanvasDraw canvasWidth={props.canvasWidth} canvasHeight={props.canvasHeight} brushRadius={props.brushRadius} 
                brushColor={props.brushColor} erase={props.erase}/>
    </>
  )
}
