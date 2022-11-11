import * as React from 'react';
import "./tileEdit.css" 
import { useRef,useEffect,useState } from 'react';
import { Button,TextField } from '@mui/material';


const Canvas = ({brushColor}) => {
  const canvasRef=useRef(null);
  const contextRef=useRef(null);
  const [isDrawing, setIsDrawing]= useState(false)
  const[canvasWidth, setCanvasWidth]=useState(600)
  const[canvasHeight, setCanvasHeight]=useState(600)
  const[brushRadius,setBrushRadius]=useState(5)
  const handleHeight=(e)=>{
    setCanvasHeight(e.target.value)
  }
  const handleWidth=(e)=>{
    setCanvasWidth(e.target.value)
  }

 useEffect(()=>{
  const canvas=canvasRef.current;
  canvas.width=canvasWidth;
  canvas.height=canvasHeight;
  

  const context= canvas.getContext("2d")
  context.lineCap="round"
  context.strokeStyle=String(brushColor)
  context.lineWidth=brushRadius;
  contextRef.current=context;

  },[])
  const startDrawing=({nativeEvent})=>{
    const{offsetX, offsetY}=nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();


  }
  const draw=({nativeEvent})=>{
  if (!isDrawing){
    return;
  }
  const{offsetX, offsetY}=nativeEvent;
  contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  }
  const stopDrawing=()=>{
    contextRef.current.closePath();
    setIsDrawing(false)

  }
  const setToDraw=()=>{
    contextRef.current.globalCompositeOperation="source-over"
  }
  const setToErase=()=>{
    contextRef.current.globalCompositeOperation="destination-out"
  }
  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
};

  
  return (
    <>
   <canvas className='canvas-main'
    ref={canvasRef}
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={stopDrawing}
    onMouseLeave={stopDrawing}    
    >
   </canvas>
   <div>
   <textarea id="outlined-basic" label="Outlined" variant="outlined" onChange={(e)=>  setCanvasHeight(e.target.value)} value={canvasHeight} />
   <textarea   onChange={(e)=>  setCanvasWidth(e.target.value)} value={canvasWidth} />
    <Button onClick={setToErase}>Erase</Button>
    <Button onClick={setToDraw}>Draw</Button>
    <Button href="download_link" onClick={saveImageToLocal}>Save</Button>
   </div>
   </>
  );
};
export default Canvas