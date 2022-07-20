import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  "./EditCrew.css"
import Input from '../../../components/input/Input';
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from '../../../context/UserAuthcontext';


const EditCrew = () => {
  const [crewMember,setCrewMember] = useState({
    firstname:'',
    lastname:'',
    dob:'',
    userId:'',
    gender:'',
    addtionreq:'',
    mobilNo:"",
    email:"",
    addline1:"",
    addline2:"",
    city:"",
    state:"",
    pincode:"",
    
  })
  const navigate =useNavigate();
  const { usersId,setUsersid } = useUserAuth();

const {firstname,lastname,dob,userId,gender,addtionreq,mobilNo,email,addline1,addline2,city,state,pincode}=crewMember

const handlechange =(e) =>{
    let {name,value} = e.target;
    setCrewMember ({...crewMember,[name]:value})
}
const editHandler = async () => {
  try {
  const docSnap = await UserDataService.getCrew(usersId);
  const doc =docSnap.data()
    console.log("the record is :",doc);
    setCrewMember({firstname:doc.firstname,lastname:doc.lastname,dob:doc.dob,userId:doc.userId,gender:doc.gender,
      addtionreq:doc.addtionreq,mobilNo:doc.mobilNo,email:doc.email,addline1:doc.addline1,addline2:doc.addline2,
      city:doc.city,state:doc.state,pincode:doc.pincode})
  } catch (err) {
      console.log(err);
  }
};
useEffect(() => {
  if (usersId !== undefined && usersId !== "") {
    editHandler();
  }
}, [usersId]);


/// ADD/Edit Crew Member Fn ////
const submitHandler = async(e) =>{
  e.preventDefault();
  const crew = {
    firstname,lastname,dob,userId,gender,addtionreq,mobilNo,email,addline1,addline2,city,state,pincode,
    assignedFlight:"NA",days:[{date:'',assignflight:''}]
    };

  try {
    if (usersId !== undefined && usersId !== "") {
      await UserDataService.updateCrew(usersId, crew);
      setUsersid("");
      navigate('/admin/crew/viewCrew')
  }
    else{
      await UserDataService.addCrewMember(crew)
      navigate('') 
    }
       
  }catch(err){
      console.log(err)
  }
  setCrewMember({firstname:"",lastname:"",dob:"",userId:"",gender:"",addtionreq:"",mobilNo:"",email:"",
  addline1:"",addline2:"",city:"",state:"",pincode:""})
  navigate('/admin/crew/viewCrew')
 
}

const cancelChange =()=>{
  setUsersid("")
        navigate('/admin/crew/viewCrew')
}
return (
  <>
    <div className="editpage_edit">
      <div className="editCrewHome">
        <form onSubmit={submitHandler}>
          <div className="editCrew">
            <div className="editUser_input">
              <label htmlFor="firstname">First name</label>
              <Input
                type="text"
                name="firstname"
                value={firstname}
                onChange={handlechange}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="lastname">Last name</label>
              <Input
                type="text"
                name="lastname"
                value={lastname}
                onChange={handlechange}
              />
            </div>
          </div>
          <div className="editCrew">
            <div className="editUser_input">
              <label htmlFor="dob">Date of Birth</label>
              <Input
                type="date"
                name="dob"
                value={dob}
                onChange={handlechange}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="userid">User ID</label>
              <Input
                type="text"
                name="userId"
                value={userId}
                onChange={handlechange}
              />
            </div>
          </div>
          <div className="editCrew">
            <div className="editUser_input">
              <label htmlFor="gender">Gender</label>
              <Input
                type="text"
                name="gender"
                value={gender}
                onChange={handlechange}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="addtionreq">Additional Requests</label>
              <Input
                type="text"
                name="addtionreq"
                value={addtionreq}
                onChange={handlechange}
              />
            </div>
          </div>
          <div className="editCrewMob">
            <div className="editMob">
              <div>
                <label htmlFor="mobileNo">Mobile No</label>
                <Input
                  type="tel"
                  name="mobilNo"
                  value={mobilNo}
                  onChange={handlechange}
                />
              </div>
              <div>
                <label htmlFor="email">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="editCrewAddress">
              <div>
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="editAdd"
                  placeholder="Address Line 1"
                  name="addline1"
                  value={addline1}
                  onChange={handlechange}
                />
                <Input
                  type="text"
                  className="editAdd"
                  placeholder="Address Line 2"
                  name="addline2"
                  value={addline2}
                  onChange={handlechange}
                />
                <div className="editCrewAdd">
                  <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={handlechange}
                  />
                  <Input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={state}
                    onChange={handlechange}
                  />
                  <Input
                    type="number"
                    placeholder="Pin code"
                    name="pincode"
                    value={pincode}
                    onChange={handlechange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="editUser_button">
            <div>
              <button type="reset" className="btn btn-primary"onClick={cancelChange}>
                Cancel
              </button>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
              {usersId === "" ? "Add user" : "Save Edit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
);
}

export default EditCrew