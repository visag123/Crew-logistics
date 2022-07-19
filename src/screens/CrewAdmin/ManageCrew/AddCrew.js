import React, { useState, useEffect } from "react";
import UserDataService from "../../../firebase/userservice";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const AddCrew = () => {
  const [assignMember, setAssignMember] = useState([]);

  const [selectedCrew, updateSelectedCrew] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  
  // const selectedCrew = (doc) => {
    
  //   // updateSelectedCrew(selectedCrew =>
  //   //   selectedCrew.map(obj=>{
  //   //     if(obj.userId === doc.map(id=>id.userId)){
  //   //       return {...obj};
  //   //     }
  //   //     return {...obj,doc};
  //   //   })
  //   //   );
  // }
  const saveCrewMembers = () => {
    console.log(selectedCrew);
  }
  const handleDate = (e) => {
    console.log(e.target.value)
  }
  const handleClose = () => {
    navigate('/admin/crew/manageCrew');
  }
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
              value={location.state.FlightNo}
            />
          </div>
          <div>
            <Input
              type="date"
              label="Date"
              onChange={(e) => handleDate(e)}
            />
          </div>
          <div>
            <Button
              type="button"
              children="Save"
              className="btn btn-primary"
              onClick={saveCrewMembers}
            />
          </div>
          <div>
            <Button
              type="button"
              children="Close"
              className="btn btn-primary ms-2"
              onClick={handleClose}
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
                  <td><input type="checkbox" onClick={(e) => e.target.checked && selectedCrew(doc)} /></td>
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