import * as React from 'react';
import "./tileEdit.css" 
import { useRef,useEffect,useState } from 'react';
import { Button,TextField } from '@mui/material';
import {uploadImageToCloudinaryAPIMethod} from "../../client"

const Canvas = ({brushColor,tileList, setTileList,canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight,brushRadius}) => {
  
  const canvasRef=useRef(null);
  const contextRef=useRef(null);
  const [isDrawing, setIsDrawing]= useState(false)
  
  
  
  // const canvas=canvasRef.current;
  // canvas.width=canvasWidth;
  // canvas.height=canvasHeight;
  

  // const context= canvas.getContext("2d")


  const handleImageSelected = (image) => {
    console.log("New File Selected");
        const formData = new FormData();
        const unsignedUploadPreset = 'ngrdnw4p'
        formData.append('file', image);
        formData.append('upload_preset', unsignedUploadPreset);

        console.log("Cloudinary upload");
        uploadImageToCloudinaryAPIMethod(formData).then((response) => {
            //console.log("Upload success");
            console.dir(response.secure_url);
            
        });
    
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
  

  },[canvasHeight,canvasWidth, brushRadius, brushColor])

 
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
  const clearCanvas=()=>{
    contextRef.clearRect(0, 0, canvasWidth, canvasHeight);
  }
  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
    setTileList([image, ...tileList])
    console.log(tileList)
    clearCanvas()
   
};



const saveImageToCloud = (event) => {
  let link = event.currentTarget;
  link.setAttribute('download', 'canvas.png');
  let image = canvasRef.current.toDataURL('image/png');

  handleImageSelected(image)
 
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
   
    <Button onClick={setToErase}>Erase</Button>
    <Button onClick={setToDraw}>Draw</Button>
    <Button  onClick={saveImageToLocal}>Save</Button>
    <Button onClick={saveImageToCloud}>Save to cloud</Button>
   </div>
   </>
  );
};
export default Canvas