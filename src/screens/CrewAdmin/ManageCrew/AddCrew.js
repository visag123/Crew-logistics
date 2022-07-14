import React, { useState, useEffect } from "react";
import UserDataService from "../../../firebase/userservice";
import Input from "../../../components/Input/Input";

const AddCrew = () => {
  const [assignMember, setAssignMember] = useState([]);

  useEffect(() => {
    getCrewMember();
  }, []);

  /// Fetch roster datas from the firebase ///
  const getCrewMember = async () => {
    const data = await UserDataService.getCrewMember();
    setAssignMember(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    
  return (
    <>
      
     <div className="sys-table">
     <div className="addCrewHeader">
         <div>
           <Input 
           type="text"
           label="Flight No"
           />
         </div>
         <div>
           <Input 
           type="date"
           label="Date"
           />
         </div>
      </div>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>User ID</th>
              <th>Employee Name</th>
              <th>Gender</th>
              <th className="addReq">Additional Requests</th>
            </tr>
          </thead>
          <tbody>
            {assignMember.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td><input type="checkbox" /></td>
                  <td>{doc.userId}</td>
                  <td className='No_of_crew'>{doc.firstname}</td>
                  <td>{doc.gender}</td>
                  <td>{doc.addtionreq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AddCrew