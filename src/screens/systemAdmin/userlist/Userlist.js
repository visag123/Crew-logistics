import React, { useRef } from "react";
import "./Userlist.css";
import UserDataService from "../../../firebase/userservice";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../../context/UserAuthcontext";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const [error, setError] = useState(false);
  const searchinput = useRef();
  const [message, setMessage] = useState({ error: false, msg: "" });
  const { signUp, getUserId } = useUserAuth();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await UserDataService.getAllUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const setRolehandler = () => {
    setError(!error);
  };

  const searchHandler = (e) => {
    const searchrf = searchinput.current.value;
    setSearchUsers(searchrf);

  };
  const clearMassage = () =>{
    setTimeout(() => {
    setMessage({ error: false, msg: "" });
  }, 3000);}

  const acceptuser = async (userId, username,email,password,status,role)=> {
    const user = {
      userId,
      username,
      email,
      password,
      status,
      role,
    };

    try {
      if (status === "Active") {
        await signUp(email, password);
        await UserDataService.addUser(user);
        setMessage({ error: true, msg: "Successfully Uptaded" });
        clearMassage()

      } else {
        setMessage({ error: true, msg: "User Status was Inactive" });
        clearMassage()
      }
    } catch (err) {
      console.log(err);
      setMessage({ error: true, msg: err.message });
      clearMassage()
    }
  };
  const rejectuser = async (id) => {
    await UserDataService.deleteUsers(id);
    getUsers();
    setMessage({ error: true, msg: "Delete Successfully" });
    clearMassage()

  };
  return (
    <>
      <div className="head_navbar">
        <div className="header_search">
          <form>
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder="search"
              ref={searchinput}
              value={searchUsers}
              onChange={searchHandler}
            />
          </form>
        </div>
        <div className="err_catch">
          <small>{message.error ? <p>{message.msg}</p> : ""}</small>
        </div>
        <div className="edit_content">
          <div className="set_role" onClick={setRolehandler}>
            <i className="fa-solid fa-user"></i>
            <p>Set Role</p>
          </div>
          <div className="edit_role">
            <Link to="/admin/edit">
              <i className="fa-solid fa-user-plus"></i>
              <p>Add User</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Last Edited</th>
              <th>Save/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((doc)=>{
              if (searchUsers === undefined && error === false){
                 return doc
              } else if (  error === false && doc.username.toLowerCase().includes(searchUsers.toLocaleLowerCase())){
                return doc
              } else if (error === true )
               return doc.role ==="NA"
            })
            .map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getUserId(doc.id)}>
                    <Link to="/admin/edit">
                      {doc.userId === "" ? "NA" : doc.userId}
                    </Link>
                  </td>

                  <td onClick={() => getUserId(doc.id)}>
                    <Link to="/admin/edit">
                      {doc.username === "" ? "NA" : doc.username}
                    </Link>
                  </td>
                  <td>{doc.email}</td>
                  <td>{doc.status}</td>
                  <td>{doc.role}</td>
                  <td>{doc.time}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        acceptuser(doc.userId,doc.username,doc.email,doc.password,doc.status,doc.role);  
                      }}
                    >
                      <i className="fa-solid fa-circle-check"></i>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={(e) => rejectuser(doc.id)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Userlist;
