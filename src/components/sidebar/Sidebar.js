import React from 'react';
import "./Sidebar.css";
import { Link, } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <section>
        <div className="sidebar">
          <ul>
            <h6>System Admin</h6>
            <Link to="users">
              <li>
                <i className="fa-solid fa-id-card"></i>Users
              </li>
            </Link>
            <Link to="">
              <li>
                <i className="fa-solid fa-file-lines"></i>Contacts
              </li>
            </Link>
            <Link to="/">
              <li>
                <i className="fa-solid fa-right-from-bracket"></i>Logout
              </li>
            </Link>
          </ul>
        </div>
      </section>
    </div>
  );
  
}

export default Sidebar