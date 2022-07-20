import React, { useState, useEffect } from "react";
import UserDataService from "../../../firebase/userservice";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthcontext";

const ViewMember = () => {
  const [crewMember, setCrewMember] = useState([]);
  const navigate = useNavigate();
  const { getUserId } = useUserAuth();

  useEffect(() => {
    getCrewMember();
  }, []);

  /// Fetch roster datas from the firebase ///
  const getCrewMember = async () => {
    const data = await UserDataService.getCrewMember();
    setCrewMember(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const addCrewMember = () => {
    navigate("/admin/crew/editCrew");
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
        <i className="fa-solid fa-circle-plus" onClick={addCrewMember}></i>
      </div>
      <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Employee Name</th>
              <th>Gender</th>
              <th>Contact NO</th>
              <th>Mail ID</th>
              <th>ASSIGNED Flight No</th>
            </tr>
          </thead>
          <tbody>
            {crewMember.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getUserId(doc.id)}>
                    <Link to="/admin/crew/crewRost">{doc.userId}</Link>
                  </td>
                  <td>{doc.firstname}</td>
                  <td>{doc.gender}</td>
                  <td>{doc.mobilNo}</td>
                  <td>{doc.email}</td>
                  <td className='Num_crew'>{doc.assignedFlight}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMember;
