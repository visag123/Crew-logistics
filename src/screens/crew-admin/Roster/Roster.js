import React, { useState, useEffect } from "react";
import UserDataService from "../../../firebase/userservice";
import "./Roster.css";

const Roster = () => {
  const [roster, setRoster] = useState([]);
  
  useEffect(() => {
    getRoster();
  }, []);

  /// Fetch roster datas from the firebase ///
  const getRoster = async () => {
    const data = await UserDataService.getCrewusers();
    setRoster(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
      <div className="editpage_search">
        <form>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" placeholder="search" />
        </form>
      </div>
      <div className="sys-table">
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
            {roster.map((doc) => {
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
