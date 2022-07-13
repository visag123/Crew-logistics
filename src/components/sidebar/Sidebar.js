import React from 'react';
import "./Sidebar.css";
import { Link, useNavigate, } from "react-router-dom";
import { useUserAuth } from '../../context/UserAuthcontext';

const Sidebar = () => {
    const {isAuth,setIsAuth,crew,setCrew} =useUserAuth();
    const navigate = useNavigate();

/// Logout fn ///    
  const logoutHandler =() =>{
    setIsAuth(!isAuth)
    setCrew(false)
    navigate('/')
  }
  return (
    <>
      <section>
        <div className="sidebar">
          <ul>
            <h6>{crew ? "Crew Admin":"System Admin"}</h6>
            <Link to={ crew ?"crew/manageCrew": "users"}>
              {crew? (<li>Manage Crew</li> ):(<li>
              <i className="fa-solid fa-id-card"/> Users
              </li>)}
            </Link>
            <Link to="crew/viewCrew">
             {crew? (<li>Manage Crew Members</li>):
              (<li>
               <i className="fa-solid fa-file-lines"></i> Contacts
              </li>)}
            </Link>
            <Link to="crew/roster">
             {crew && <li>
                View Roster
              </li>}
            </Link>
            <Link to="">
             {crew && <li>
               Logistics Arrangement
              </li>}
            </Link>
              <li onClick={logoutHandler}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </li>
          </ul>
        </div>
      </section>
    </>
  );
  
}

export default Sidebar