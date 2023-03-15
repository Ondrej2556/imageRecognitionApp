import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, faceData}) =>{

    const calculateBoxLocation = (data) =>{
        const image = document.getElementById('inputImage')
        const width = Number(image.width);
        const height = Number(image.height);

          return {
            left: data.left_col * width,
            top: data.top_row * height,
            right: width - (data.right_col * width),
            bottom: height - (data.bottom_row * height),
          }
        }

    const faceBoxArray = faceData.map((oneFace, index)=>{
        const data = oneFace.region_info.bounding_box
        
         return <div className="bounding-box" key={index} style={calculateBoxLocation(data)}></div>;
                       
    })
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" width="500" height="auto" src={imageUrl} alt=""/>
                 {faceBoxArray}
            </div>
        </div>
    );  
}
export default FaceRecognition;