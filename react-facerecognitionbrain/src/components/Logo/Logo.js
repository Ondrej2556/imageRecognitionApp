import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./Brain.png";


const Logo = () =>{
    return(
        <div className="ma4 mt0"> 
            <Tilt className="myBg shadow-2" style={{width:"180px", height:"180px",display: "flex",alignItems:"center", justifyContent: "center"}}>
                    <img onClick={() => window.location.replace("/")}src={brain} alt="my-logo" size="100px" style={{display:"flex", alignItems:"center", maxWidth: "50%"}}/>
            </Tilt>
        </div>
    );  
}
export default Logo;