import React from 'react'
import "./error.scss";
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <>
        <div className="container">
            <div style={{minHeight:"85vh",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                <img src="/404.svg" alt="" style={{width:"500px",maxWidth:"100%",marginBottom:20}} />
                <h2 className='mb-3'>PAGE NOT FOUND</h2>
                <NavLink to="/" className="btn btn-primary" style={{fontSize:18}}>BACK TO Home Page</NavLink>
            </div>
        </div>
    </>
  )
}

export default Error