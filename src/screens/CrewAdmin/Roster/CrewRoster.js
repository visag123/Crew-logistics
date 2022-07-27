import React, { useState, useEffect,useRef } from "react";
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from "../../../context/UserAuthcontext";

const CrewRoster = () => {
    const [roster, setRoster] = useState([]);
    const [error,setError] = useState(false);
    const [today,setDate] =useState('');
    const [flightId,setFlightId] =useState('');
    const { usersId,setUsersid } = useUserAuth();
     
    useEffect(() => {
      getRoster();
    }, []);
  
    const editHandler = async () => {
        try {
        const docSnap = await UserDataService.getCrew(usersId);
        const doc =docSnap.data()
        setFlightId(doc.assignedFlight)
          console.log("the record is :",doc.assignedFlight);
      
        } catch (err) {
            console.log(err);
        }
      };
    useEffect(() => {
        if (usersId !== undefined && usersId !== "") {
          editHandler();
        }
      }, [usersId]);
    const onDateChange =(e)=>{
      setDate(e.target.value)
    }
  
    /// Fetch roster datas from the firebase ///
    const getRoster = async () => {
      const data = await UserDataService.getCrewusers();
      setRoster(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(roster);
    };

    const resetSearch = () => {
      setError(false)
      setDate('')
    }
  
    return (
      <>
      
        <div className="sys-table">
           <div className="filterDate">
                <li>Select Date</li>
                <input type="date" value={today} onChange={onDateChange} />
              <button type="reset" onClick={resetSearch}><i className="fa-solid fa-delete-left"></i></button>

              </div>

          <table className="rosterTable">
            <thead>
              <tr>
              <th>Cab Pickup Time</th>
                <th>Flight No</th>
                <th>Fight Route</th>
                <th>Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {roster
                .filter((doc) => {
                  if (today!=="" && flightId===doc.FlightNo) {
                    return today === doc.Date;
                  } else if (flightId===doc.FlightNo)
                   {
                    return doc;
                  } 
                })
                .map((doc) => {
                  return (
                    <tr key={doc.id}>
                        <td>{doc.cabPickup}</td>
                      <td className="flightNo">{doc.FlightNo}</td>  
                      <td>{doc.FlightRoute}</td>
                      <td>{doc.Date}</td>
                      <td className="Num_crew">{doc.DepartureTime}</td>
                      <td>{doc.ArrivalTime}</td>
                      <td className="Num_crew">{doc.duration}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default CrewRoster