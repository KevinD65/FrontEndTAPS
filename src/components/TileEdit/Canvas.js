import * as React from 'react';
import "./tileEdit.css" 
import { useRef,useEffect,useState } from 'react';
import { Button,TextField,Box } from '@mui/material';
import {uploadImageToCloudinaryAPIMethod} from "../../client"

const Canvas = ({predraw, brushColor,tileList, setTileList,canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight,brushRadius,erase, saveCurrent, setSaveCurrent}) => {
  
  const canvasRef=useRef(null);
  const contextRef=useRef(null);
  const [isDrawing, setIsDrawing]= useState(false)
  const [clearCanvas, setClearCanvas]=useState(false)
  
  // const canvas=canvasRef.current;
  // canvas.width=canvasWidth;
  // canvas.height=canvasHeight;
  

  // const context= canvas.getContext("2d")



useEffect(()=>{
 if (erase==true){setToErase();}
 else setToDraw()

 
},[erase])
  
 useEffect(()=>{
  const canvas=canvasRef.current;
  canvas.width=canvasWidth;
  canvas.height=canvasHeight;
  const context= canvas.getContext("2d")
  context.lineCap="round"
  context.strokeStyle=brushColor
  context.lineWidth=brushRadius;
  contextRef.current=context;
  canvasRef.current=canvas;

  },[canvasWidth,canvasHeight,clearCanvas])



  useEffect(()=>{
    console.log("Predraw is not null")
    function loadImage(url) {
      return new Promise((fulfill, reject) => {
        let imageObj = new Image();
        imageObj.onload = () => fulfill(imageObj);
        imageObj.setAttribute('crossOrigin', 'anonymous');
        imageObj.src = url;
      });
    }

  async function redoDrawing(predraw){
      let picture = await loadImage(predraw);
      console.log("Picture is ", picture);
      //.toDataURL();
      contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      contextRef.current.drawImage(picture, 0, 0);
  }
  redoDrawing(predraw);
    
   },[predraw]);

 
  const startDrawing=({nativeEvent})=>{
    canvasRef.width=canvasWidth;
    canvasRef.height=canvasHeight;
    const{offsetX, offsetY}=nativeEvent;
    contextRef.current.strokeStyle=brushColor
    contextRef.current.lineWidth=brushRadius
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
  // const clearCanvas=()=>{
  //   console.log("here")
  //   contextRef.clearRect(0, 0, canvasWidth, canvasHeight);
  // }
  const saveImageToLocal = async (event) => {
    console.log(event.currentTarget)
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image);
    //let src = await handleImageSelected(image); 
    setTileList([image, ...tileList])
    console.log(tileList)
    // clearCanvas()
   
};

const handleImageSelected = async (image) => {
  console.log("New File Selected");
      const formData = new FormData();
      const unsignedUploadPreset = 'ngrdnw4p'
      formData.append('file', image);
      formData.append('upload_preset', unsignedUploadPreset);

      console.log("Cloudinary upload");
      return uploadImageToCloudinaryAPIMethod(formData).then((response) => {
          //console.log("Upload success");
          console.dir(response.secure_url);
          return response.secure_url;
      });
  
}

const saveImageToCloud = async (event) => {
  let link = event.currentTarget;
  link.setAttribute('download', 'canvas.png');
  let image = canvasRef.current.toDataURL('image/png');

  handleImageSelected(image)
 
};
  
  return (
    <>
    <Box>
   
   {/* <Button onClick={setToErase}>Erase</Button>
   <Button onClick={setToDraw}>Draw</Button> */}
   <Button variant="contained" sx={{marginRight:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }}onClick={saveImageToLocal}>Save Current Tile</Button>
   <Button variant="contained" sx={{marginRight:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} onClick={()=>{setClearCanvas(!clearCanvas)}}>Clear Canvas</Button>
   {/* <Button onClick={saveImageToCloud}>Save to cloud</Button> */}
  </Box>
   <canvas className='canvas-main'
    ref={canvasRef}
    onMouseDown={startDrawing}
    onMouseMove={draw}
    onMouseUp={stopDrawing}
    onMouseLeave={stopDrawing} 
       
    >
   </canvas>
   
   </>
  );
};
export default Canvas
