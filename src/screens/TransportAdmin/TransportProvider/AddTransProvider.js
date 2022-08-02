import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import UserDataService from "../../../firebase/userservice";
import Input from '../../../components/input/Input';

const AddTransProvider = () => {
    const [agencyName,setAgencyName] = useState('');
    const [location,setLocation] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [noOfVehicles,setNoOfVehicles] = useState('');
    const [noOfDrivers,setNoOfDrivers] = useState('');
    const [activeFrom,setActiveFrom] = useState('');
    const [activeTo,setActiveTo] = useState('');
     const navigate = useNavigate();
  
      const submitHandler = async(e) =>{
        e.preventDefault();
        const newProvider = {
            agencyName,
            location,
            contactNo,
            noOfVehicles,
            noOfDrivers,
            activeFrom,
            activeTo,
          };
          const newuser ={
            location,
            username:agencyName,
            status:'Active',
            role:'Transport Provider',
            password:'232323',
          }

        try {
           
            await UserDataService.addTransProvider(newProvider);
            await UserDataService.addUsers(newuser);
            navigate('/admin/trans/transprovider')
            console.log(newProvider);
          
        }catch(err){
            console.log(err)
        }
      }
      const clearUser =()=>{
        // setUsersid("")
        navigate('/admin/trans/transprovider')
      }
  return (
    <>
    <div className="editpage_maincontent">
     
      <div className="editpage_edit">
        <div className="edit">
          <form onSubmit={submitHandler}>
            <div className="editUser">
              <div className="editUser_input"> 
                <label htmlFor="agencyName">Agency Name</label>
                <Input
                  type="text"
                  id="agencyName"
                  value={agencyName}
                  onChange={(e) => {
                    setAgencyName(e.target.value);
                  }}
            
                />
              </div>
              <div className="editUser_input">
                <label htmlFor="contactNo">Contact NO</label>
                <Input
                  type="text"
                  id="contactNo"
                  value={contactNo}
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                
                />
              </div>
            </div>
            <div className="editUser"> 
              <div className="editUser_input">
                <label htmlFor="location">Location</label>
                <select value={location}
                  id="role"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Select Role">Select location</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>
              <div className="editUser_input">
              <label htmlFor="noOfVehicles">NO of Vehicles</label>
              <Input
                  type="text"
                  id="noOfVehicles"
                  value={noOfVehicles}
                  onChange={(e) => {
                    setNoOfVehicles(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="editUser_status">
            <div className="editUser_in"> 
                <label htmlFor="noOfDrivers">No of Drivers</label>
                <Input
                  type="text"
                  id="noOfDrivers"
                  value={noOfDrivers}
                  onChange={(e) => {
                    setNoOfDrivers(e.target.value);
                  }}
                />
              </div>
              
              <div className="editUser_input">
              <label htmlFor="">Active Period</label>
               <div className='lifeSpan'>
                <Input
                  type="date"
                  className="lifeSpan_time"
                  value={activeFrom}
                  onChange={(e) => {
                    setActiveFrom(e.target.value);
                  }}
                />
                <font>to</font>
                <Input
                  type="date"
                  value={activeTo}
                  className="lifeSpan_time"
                  onChange={(e) => {
                    setActiveTo(e.target.value);
                  }}
                />
                </div>
              </div>
            </div>

            <div className="editUser_button">
              <div>
                <button
                  type="reset"
                  className="btn btn-primary"
                  onClick={() => clearUser()}
                >
                  Cancel
                </button>
              </div>
              <div >
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</>
  )
}

export default AddTransProvider