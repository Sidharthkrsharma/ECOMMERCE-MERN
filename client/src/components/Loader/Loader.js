import React from 'react'
import "./Loader.scss"

const Loader = () => {
    const loaderStyle = {
        backgroundColor:"#f05e8a",
        height:"18px",
        width:"18px",
        marginRight:"3px"
    }
  return (
   <>
    <div className="loader">
        <div style={loaderStyle}></div>
        <div style={loaderStyle}></div>
        <div style={loaderStyle}></div>
    </div>
   </>
  )
}

export default Loader