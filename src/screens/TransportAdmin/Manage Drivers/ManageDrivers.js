
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./ManageDrivers.css"



const ManageDrivers = () => {
  
   const navigate = useNavigate()
  
   return (
    <>
      <div className="editpage_search">
        <form>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
          <input type="text" placeholder="search" />
        </form>
        <i className="fa-solid fa-circle-plus" onClick={()=>navigate('/admin/trans/addDrivers')} />

      </div>

      <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Contact Number</th>
              <th>Service Area</th>
              <th>Assigned Cab</th>
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
                  <td>{doc.status}</td>
                  <td>{doc.contactNumber}</td>
                  <td>{doc.serviceArea}</td>
                  <td>{doc.assignedCab}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default ManageDrivers