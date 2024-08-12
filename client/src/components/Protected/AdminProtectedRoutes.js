import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoutes = ({Components}) => {
    const navigate = useNavigate();

    const checkadminvalid = ()=>{
        let login = localStorage.getItem("admintoken");

        if(!login){
            navigate("/admin/login")
        }
    }

    useEffect(()=>{
        checkadminvalid()
    },[])
  return (
    <div>
        <Components />
    </div>
  )
}

export default AdminProtectedRoutes