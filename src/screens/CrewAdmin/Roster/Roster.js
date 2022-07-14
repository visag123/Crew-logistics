import React, { useState, useEffect,useRef } from "react";
import UserDataService from "../../../firebase/userservice";
import "./Roster.css";

const Roster = () => {
  const [roster, setRoster] = useState([]);
  const [error,setError] = useState(false);
  const [today,setDate] =useState('');
  const [searchUsers, setSearchUsers] = useState("");
  const [departure,setDeparture] =useState('')
  const [arrival,setArrival] =useState('')
  const [from,setFrom] =useState('')
  const [to,setTo] =useState('')
  const searchinput = useRef();
   
  useEffect(() => {
    getRoster();
  }, []);

  const searchHandler = (e) => {
    const searchrf = searchinput.current.value;
    setSearchUsers(searchrf);

  };
  const onDateChange =(e)=>{
    setDate(e.target.value)
  }

  /// Fetch roster datas from the firebase ///
  const getRoster = async () => {
    const data = await UserDataService.getCrewusers();
    setRoster(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const routeHandler = (e) => {
    e.preventDefault();
    setError(true)
    setFrom(departure)
    setTo(arrival)
    setDeparture('')
    setArrival('')
  }
  const resetSearch = () => {
    setError(false)
    setDate('')
  }

  return (
    <>
    
      <div className="sys-table">
        <div className="rosterHeader">
          <div className="rosterSearch">
            <div className="rosterSearchFilter">
            <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder="Search"             
              ref={searchinput}
              value={searchUsers}
              onChange={searchHandler}
            />
            </div>
          
          </div>
          <div className="rosterFilter">
            <div className="filterDate">
              <li>Select Date</li>
              <input type="date" value={today} onChange={onDateChange} />
            </div>
           <div className="filterFlight">
              <form onSubmit={routeHandler}>
                <li>Flight Route</li>
                <input
                  type="text"
                  placeholder="From"
                  value={departure}
                  required
                  onChange={(e) => setDeparture(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="To"
                  value={arrival}
                  required
                  onChange={(e) => setArrival(e.target.value)}
                />
                <button type="submit">GO</button>
                <button type="reset" onClick={resetSearch}><i className="fa-solid fa-delete-left"></i></button>
              </form>
            </div>
          </div>
        </div>
        <table className="rosterTable">
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Crew Members</th>
              <th>Date</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {roster
              .filter((doc) => {
                if (today!=="" && error === false) {
                  return today === doc.Date;
                } else if (
                  error === false &&
                  doc.FlightNo.toLowerCase().includes(searchUsers.toLowerCase())
                ) {
                  return doc;
                } else if (from === doc.Departure.toLowerCase() && to === doc.Arrival.toLowerCase())
                  return doc;
              })
              .map((doc) => {
                return (
                  <tr key={doc.id}>
                    <td className="flightNo">{doc.FlightNo}</td>
                    <td>{doc.Departure}</td>
                    <td>{doc.Arrival}</td>
                    <td className="Num_crew">{doc.CrewMembers}</td>
                    <td>{doc.Date}</td>
                    <td className="Num_crew">{doc.DepartureTime}</td>
                    <td>{doc.ArrivalTime}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Roster;
