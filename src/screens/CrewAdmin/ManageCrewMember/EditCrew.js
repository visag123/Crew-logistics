import React, { useState,useEffect ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import  "./EditCrew.css"
import Input from '../../../components/Input/Input';
import UserDataService from "../../../firebase/userservice";

const EditCrew = () => {
const [firstname,setFirstname] = useState('');
const [lastname,setLastname] = useState('');
const [dob,setDob] = useState('');
const [userId,setUserId] = useState('');
const [gender,setGender] = useState('');
const [addtionreq,setAddtionreq] = useState('');
const [mobilNo,setMobilNo] = useState('');
const [email,setEmail] = useState('');
const [addline1,setAddline1] = useState('');
const [addline2,setAddline2] = useState('');
const [city,setCity] = useState('');
const [state,setState] = useState('');
const [pincode,setPincode] = useState('');

  const userrep = useRef('');
  const [usererrors,setuserErrors] = useState(false);
  const navigate =useNavigate();

const usernameChange =async (e)=>{
  setUserId(e.target.value)
  const userref = userrep.current.value
  const data =await  UserDataService.getCrewMember();
   data.docs.forEach((doc) => {
  const newdata = doc.data();
  if (newdata.userId === userref){
     setuserErrors(true)
     setTimeout(()=>{
      setuserErrors( false);
        },3000)
        }
   })
}

const submitHandler = async(e) =>{
  e.preventDefault();
  const crew = {
    firstname,lastname,dob,userId,gender,addtionreq,mobilNo,email,addline1,addline2,city,state,pincode,
    };
    const assignCrew = {
      firstname,userId,gender,addtionreq,mobilNo,email,location:city,
      days:[{date:'',assignflight:''}]
      };
      const addCrew ={
        username:firstname,
        userId:userId,
        status:'Active',
        role:'Crew Member',
        password: '232323'
      }

  try {
      await UserDataService.addCrewMember(crew)
      await UserDataService.addAssignCrew(assignCrew)
      await UserDataService.addUsers(addCrew);  
       
  }catch(err){
      console.log(err)
  }
  setFirstname('')
  setLastname('')
  setDob('')
  setUserId('')
  setGender('')
  setAddtionreq('')
  setMobilNo('')
  setEmail('')
  setAddline1('')
  setAddline2('')
  setCity('')
  setState('')
  setPincode('')
  navigate('/admin/crew/viewCrew')
}

const cancelChange =()=>{
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
                onChange={(e)=>setFirstname(e.target.value)}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="lastname">Last name</label>
              <Input
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e)=>setLastname(e.target.value)}
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
                onChange={(e)=>setDob(e.target.value)}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="userid">User ID  &nbsp;&nbsp;&nbsp;&nbsp;   <small>{usererrors ? "User Id already exist" : ""}</small></label>
              <input
                type="text"
                ref={userrep}
                value={userId}
                onChange={usernameChange}
                
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
                onChange={(e)=>setGender(e.target.value)}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="addtionreq">Additional Requests</label>
              <Input
                type="text"
                name="addtionreq"
                value={addtionreq}
                onChange={(e)=>setAddtionreq(e.target.value)}
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
                  onChange={(e)=>setMobilNo(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
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
                  onChange={(e)=>setAddline1(e.target.value)}
                />
                <Input
                  type="text"
                  className="editAdd"
                  placeholder="Address Line 2"
                  name="addline2"
                  value={addline2}
                  onChange={(e)=>setAddline2(e.target.value)}
                />
                <div className="editCrewAdd">
                  <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Pin code"
                    name="pincode"
                    value={pincode}
                    onChange={(e)=>setPincode(e.target.value)}
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
             Add User
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