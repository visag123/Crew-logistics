import React from 'react';
import "./Sidebar.css";
import { Link, useNavigate, } from "react-router-dom";
import { useUserAuth } from '../../context/UserAuthcontext';

const Sidebar = () => {
    const {isAuth,setIsAuth,crew,setCrew,trans,setTrans} =useUserAuth();
    const navigate = useNavigate();

/// Logout fn ///    
  const logoutHandler =() =>{
    setIsAuth(!isAuth)
    setCrew(false)
    setTrans(false)
    navigate('/')
  }
  return (
    <>
      <section>
        <div className="sidebar">
          <ul>
            <h6>{crew ? "Crew Admin":(trans?"Transport Admin":"System Admin")}</h6>
            <Link to={ crew ?"crew/manageCrew":(trans?"trans/manageDrivers":"users")}>
              {crew? (<li>Manage Crew</li> ):(
                trans?(<li>ManageDrivers</li>):
                (<li>
                  <i className="fa-solid fa-id-card"/> Users
                  </li>)
              )
              }
            </Link>
            
             {crew? (<Link to="crew/viewCrew"><li> Manage Crew Members </li></Link>):(
               trans?( <Link to="trans/viewcabs"><li>View Cab Details</li></Link>):(<li>
                <i className="fa-solid fa-file-lines"></i> Contacts
               </li>)
             )
              }
               {trans&&(<li>Logistics Arrangements</li>)     
              }
              
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