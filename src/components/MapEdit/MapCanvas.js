import * as React from 'react';
import "./mapEdit.css" 
import { useRef,useEffect,useState } from 'react';
import { Button,TextField,Box } from '@mui/material';
import {uploadImageToCloudinaryAPIMethod} from "../../client"

const Canvas = (props) => {
  
  const canvasRef=useRef(null);
  const contextRef=useRef(null);
  const [isDrawing, setIsDrawing]= useState(false)
  const [clearCanvas, setClearCanvas]=useState(false)
  
  
  // const canvas=canvasRef.current;
  // canvas.width=canvasWidth;
  // canvas.height=canvasHeight;
  

  // const context= canvas.getContext("2d")


 
  



useEffect(()=>{
 if (props.erase==true){setToErase();}
 else setToDraw()

 
},[props.erase])



 useEffect(()=>{
    console.log("Use effect", props.canvasHeight, props.canvasWidth);
  const canvas=canvasRef.current;
  canvas.width=props.canvasWidth;
  canvas.height=props.canvasHeight;
  const context= canvas.getContext("2d")
  context.lineCap="round"
  context.strokeStyle="Red"
  context.lineWidth=10;
  contextRef.current=context;
  canvasRef.current=canvas;
  contextRef.current.fillStyle = "blue";
  contextRef.current.fillRect(0, 0, canvas.width, canvas.height)

  },[props.canvasWidth,props.canvasHeight,clearCanvas])

 
  
  const startDrawing=({nativeEvent})=>{
    canvasRef.width=props.canvasWidth;
    canvasRef.height=props.canvasHeight;
    const{offsetX, offsetY}=nativeEvent;
    contextRef.current.strokeStyle="red"
    contextRef.current.lineWidth=10
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
    if(contextRef.current!=null)
    contextRef.current.globalCompositeOperation="source-over"
  }
  const setToErase=()=>{
    if(contextRef.current!=null)
    contextRef.current.globalCompositeOperation="destination-out"
  }
  /*
  const saveImageToLocal = (event) => {
    console.log(event.currentTarget)
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
    setTileList([image, ...tileList])
    console.log(tileList)
    // clearCanvas()
   
};



const saveImageToCloud = (event) => {
  let link = event.currentTarget;
  link.setAttribute('download', 'canvas.png');
  let image = canvasRef.current.toDataURL('image/png');

  handleImageSelected(image)
 
};
*/
  return (
    <>
    <Box>
   
   {/* <Button onClick={setToErase}>Erase</Button>
   <Button onClick={setToDraw}>Draw</Button> */}
   <Button variant="contained" sx={{marginRight:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} onClick={()=>{setClearCanvas(!clearCanvas)}}>Clear Canvas</Button>
   {/* <Button onClick={saveImageToCloud}>Save to cloud</Button> */}
  </Box>
  <Box>
   <canvas className='canvas-main'
    ref={canvasRef}
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={stopDrawing}
    onMouseLeave={stopDrawing} 
    >
   </canvas>
   </Box>
   </>
  );
};
export default Canvas

/*onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={stopDrawing}
onMouseLeave={stopDrawing} */