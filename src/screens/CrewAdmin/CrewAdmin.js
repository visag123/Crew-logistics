import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./Crew.css";
import { useUserAuth } from '../../Context/UserAuthcontext';

const CrewAdmin = () => {
  const {isAuth,setIsAuth,crew,setCrew} =useUserAuth();
  useEffect(()=>{
    setCrew(true)
  },[])
  
  return (
    <>
    <Outlet/> 
    </>
  );
};

export default CrewAdmin;
