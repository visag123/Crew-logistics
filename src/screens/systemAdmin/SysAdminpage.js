import React  from "react";
import "./Sys.css"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const SysAdminpage = () => {
 
  return (
    <div className="systemadmin">
      <Navbar />
      <div className="content">
        <div className="sidecontent">
          <Sidebar />
        </div>
        <div className="maincontent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SysAdminpage;
