import React from "react";


const Rank = ({userName, userCount}) =>{
    return(
        <div className="white f3"> 
            {`${userName}, your current entry count is ${userCount}`}
        </div>
    );  
}
export default Rank;