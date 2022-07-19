import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./ManageCrew.css"
import UserDataService from "../../../firebase/userservice";


const ManageCrew = () => {
  const [travel, setTravel] = useState([])


  const navigate = useNavigate()
  useEffect(() => {
    getTravel();
  }, []);

  /// Fetch roster datas from the firebase ///
  const getTravel = async () => {
    const data = await UserDataService.getCrewusers();
    setTravel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleAddcrew = (data) => {
    navigate('/admin/crew/addCrew', { state: data })
  }
  return (
    <>
      <div className="editpage_search">
        <form>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" placeholder="search" />
        </form>
        <i className="fa-solid fa-circle-plus"></i>
      </div>
      <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Crew Members</th>
              <th>Flight Route</th>
              <th className='flight_time'>Flight Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {travel.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td className='text-info text-decoration-underline'
                    onClick={() => handleAddcrew(doc)}>
                    <span role="button" tabIndex="0">{doc.FlightNo}</span>
                  </td>
                  <td className='No_of_crew'>{doc.CrewMembers}</td>
                  <td>{doc.FlightRoute}</td>
                  <td>{doc.FlightDateTime}</td>
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