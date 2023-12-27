/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PAGES_PATH from './params'

const PrivateRoute = ({ Component }) => {
    const access_token = localStorage.getItem("token")
    const navigate = useNavigate();

    const fetchUserStatus = ()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            navigate(PAGES_PATH.LOGIN, {replace: true})
        
    }
    useEffect(()=>{
        if(!access_token){
            fetchUserStatus();
        }
    },[])

    if(!access_token){
        return <Navigate to={PAGES_PATH.LOGIN}/>
    }

    return <Component/>
  
}

export default PrivateRoute