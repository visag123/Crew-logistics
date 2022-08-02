import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./Crew.css";
import { useUserAuth } from '../../context/UserAuthcontext';

const CrewAdmin = () => {
  const {setCrew} =useUserAuth();
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
