import React, { useEffect }  from 'react';
import { Outlet } from 'react-router-dom';
import "./Transport.css"
import { useUserAuth } from '../../context/UserAuthcontext';

const TransportAdmin = () => {

  const {setTrans} =useUserAuth();
  useEffect(()=>{
    setTrans(true)
  },[])
  

  return (
    <>
      <Outlet/> 
    </>
  )
}

export default TransportAdmin