import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import UserDataService from "../../firebase/userservice";
import Input from '../../components/input/Input';
import "./Edit.css"
import { useUserAuth } from '../../context/UserAuthcontext';

const Editpage = () => {
    const [userId,setUserId] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    const [status,setStatus] = useState('');
    const [lifespanFrom,setLifeSpanFrom] = useState('');
    const [lifespanTo,setLifeSpanTo] = useState('');
     const navigate = useNavigate();
     const { usersId,setUsersid } = useUserAuth();

/// Get user details for edit ///
   const editHandler = async () => {
        try {
        const docSnap = await UserDataService.getUser(usersId);
          console.log("the record is :", docSnap.data());
          setUserId(docSnap.data().userId);
          setUsername(docSnap.data().username);
          setEmail(docSnap.data().email);
          setRole(docSnap.data().role);
          setStatus(docSnap.data().status);
          setLifeSpanFrom(docSnap.data().lifespanFrom)
          setLifeSpanTo(docSnap.data().lifespanTo)
        } catch (err) {
            console.log(err);
        }
      };
      useEffect(() => {
        if (usersId !== undefined && usersId !== "") {
          editHandler();
        }
      }, [usersId]);
      
/// Update user details ///   
      const submitHandler = async(e) =>{
        e.preventDefault();
        const newuser = {
            userId,
            username,
            email,
            status,
            role,
            lifespanFrom,
            lifespanTo,
            time:new Date().toLocaleString()
          };

        try {
            if (usersId !== undefined && usersId !== "") {
              await UserDataService.updateUser(usersId, newuser);
              console.log(lifespanTo);
              setUsersid("");
              navigate('/admin/users')
          }
          else{
            await UserDataService.addUsers(newuser);
            navigate('/admin/users')
          }
        }catch(err){
            console.log(err)
        }
      }
      const clearUser =()=>{
        setUsersid("")
        navigate('/admin/users')
      }
    
  return (
    <>
        <div className="editpage_maincontent">
          <div className="editpage_search">
            <form>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input type="text" placeholder="search" />
            </form>
          </div>
          <div className="editpage_edit">
            <div className="edit">
              <form onSubmit={submitHandler}>
                <div className="editUser">
                  <div className="editUser_input">
                    <label htmlFor="userid">UserID</label>
                    <Input
                      type="text"
                      id="userid"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                
                    />
                  </div>
                  <div className="editUser_input">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    
                    />
                  </div>
                </div>
                <div className="editUser">
                  <div className="editUser_input">
                    <label htmlFor="email">E-mail</label>
                    <Input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="editUser_input">
                    <label htmlFor="role">Role</label>
                    <select value={role}
                      id="role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Select Role">Select Role</option>
                      <option value="Crew Admin">Crew Admin</option>
                      <option value="Transport Admin">Transport Admin</option>
                    </select>
                  </div>
                </div>
                <div className="editUser_status">
                  <div className="editUser_input">
                    <label htmlFor="status">Status</label>
                    <select value={status}
                      id="status"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Select status">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="editUser_input">
                  <label htmlFor="">User Access Lifespan</label>
                   <div className='lifeSpan'>
                    <Input
                      type="date"
                      className="lifeSpan_time"
                      value={lifespanFrom}
                      onChange={(e) => {
                        setLifeSpanFrom(e.target.value);
                      }}
                    />
                    <font>to</font>
                    <Input
                      type="date"
                      value={lifespanTo}
                      className="lifeSpan_time"
                      onChange={(e) => {
                        setLifeSpanTo(e.target.value);
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
                    <button type="submit" className="btn btn-primary">
                      {usersId === "" ? "Add user" : "Save Edit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default Editpage