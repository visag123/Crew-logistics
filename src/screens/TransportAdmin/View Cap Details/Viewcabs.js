import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Viewcabs() {
    const navigate = useNavigate()
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
        <table>
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Category</th>
              <th>No of seats </th>
              <th>ASSIGNED Driver</th>
            </tr>
          </thead>
          <tbody>
          {[].map((doc) => {
              return (
                <tr key={doc.id}>
                <td className='text-info text-decoration-underline'
                 >
                  <span role="button" tabIndex="0">{doc.DriverName}</span></td>
                <td className='No_of_crew'>{doc.UserId}</td>
                  <td>{doc.RegistrationNumber}</td>
                  <td>{doc.Category}</td>
                  <td>{doc.NoOfSeats}</td>
                  <td>{doc.AssignedCabs}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Viewcabs