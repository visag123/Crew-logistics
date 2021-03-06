import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./ManageCrew.css"
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from "../../../context/UserAuthcontext";



const ManageCrew = () => {
    const [travel,setTravel] =useState([])
    const { getUserId } = useUserAuth();
    const date = new Date().toISOString().slice(0,10);
    const navigate = useNavigate();

  /// Fetch roster datas from the firebase ///

  useEffect(()=>{
    getTravel()
  },[])
  
    const getTravel = async () => {
      const data = await UserDataService.getFlightRost();
      setTravel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

  return (
    <>
     <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Crew Members</th>
              <th>Flight Route</th>
              <th >Flight Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {travel.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getUserId(doc.id)}><Link to='/admin/crew/addCrew'>{doc.FlightNumber}</Link></td>
                  <td className='No_of_crew'>{doc.CrewMember}</td>
                  <td>{doc.Origin} - {doc.Destination}</td>
                  <td>{date} - {doc.Departure}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageCrew