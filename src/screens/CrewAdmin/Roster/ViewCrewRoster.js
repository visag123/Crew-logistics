import React from 'react';
import { MdOutlineFlight,MdOutlineFlightTakeoff } from 'react-icons/md';
import { BsCircle } from 'react-icons/bs';
import './ViewCrewRoster.css'
function ViewCrewRoster() {

return (
  <div className="CrewRosterData_Wrapper">
    <div className="CrewRosterData">
      <div className="CrewRosterTop">
        {/* <MdOutlineFlightTakeoff color="blue" size="1.4em" /> */}
        <i class="fa-solid fa-plane-up"></i>
        
        <span className="CrewRosterDate">15 JUN</span>

        <span className="CrewRosterReport">Cab Pickup @ 15 JUN 07.40</span>
      </div>

      <div className="CrewRosterMiddle">
        <span>DOH</span>

        <BsCircle size=".6em" />

        <hr />

        <MdOutlineFlight color="blue" size="1.4em" />

        <hr />

        <BsCircle size=".6em" />

        <span>BKK</span>
      </div>

      <div className="CrewRosterFlightNO">
        <p>QR 830|SJ224</p>
      </div>

      <div className="CrewRosterDateTime">
        <p className="CrewRosterDateTimeP1">
          19 JULY <p>20:10</p>
        </p>

        <p className="CrewRosterDateTimeP1">6.20 hrs</p>

        <p>
          20 JULY<p>20:10</p>
        </p>
      </div>

      <div className="CrewRosterBottom">
        <span className="CrewRosterReport">Report @ 19 JULY 18.20</span>
      </div>
    </div>
  </div>
);

}

export default ViewCrewRoster;