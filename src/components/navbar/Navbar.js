import React from 'react';
import "./Navbar.css"
import { useUserAuth } from "../../Context/UserAuthcontext";


const Navbar = () => {
  const { userInfo } = useUserAuth();

  return (
   <>
    <div className="nav">
      <h2 className="logo">
        <i className="fa-solid fa-plane-departure"></i>
        &nbsp;&nbsp; CREW <font>Logistics</font>
      </h2>

      <ul className="navlink">
        <li>
          <i className="fa-solid fa-bell" />
        </li>
        <li>
          <i className="fa-solid fa-gear" />
        </li>
        <li>
          <i className="fa-solid fa-circle-user" />
          <small>
            {userInfo.nameId}
          </small>
        </li>
      </ul>
    </div>
   </>
  );
}

export default Navbar