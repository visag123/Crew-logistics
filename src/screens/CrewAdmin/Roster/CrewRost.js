import React, { useState,useEffect } from 'react';
import {BsCircle} from 'react-icons/bs';
import {GiCommercialAirplane} from 'react-icons/gi';
import './CrewRost.css';
import { useUserAuth } from "../../../context/UserAuthcontext";
import UserDataService from "../../../firebase/userservice";




export const CrewRost = () => {

  const [todo,setTodo] = useState([]);
  const [flightData,setFlightData] = useState([]);
  const { usersId,setUsersid } = useUserAuth();
  const date = new Date().toISOString().slice(0,10)

  /// Get user details for edit ///
     const editHandler = async () => {
          try {
            const docSnap = await UserDataService.getCrew(usersId);
            console.log("the record is :", docSnap.data());
            const doc = docSnap.data();
            setTodo(doc);  
            console.log(doc);
          
          } catch (err) {
              console.log(err);
          }
        };
        useEffect(() => {
          if (usersId !== undefined && usersId !== "") {
            editHandler();
          }
          console.log('error');
        }, [usersId]);

        useEffect(() => {
          getFlightroster();
        }, []);
      
        /// Fetch roster datas from the firebase ///
        const getFlightroster = async () => {
          const data = await UserDataService. getFlightRost();
          setFlightData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };    
      //  console.log(flightData);

  return (
    <>
    { flightData.filter((doc) => {
                if (todo.assignedFlight === doc.FlightNumber && todo.date === date) {
                  return doc;
                } 
              })
            .map((doc)=>{
              return (
                <div className='crewRoster_wrapper'>
                <div className='crewRost_head'>
                    <div><i className="fa-solid fa-calendar-days"></i>&nbsp; <b> {todo.date} </b></div>
                    <div> <p><small>Pickup from Hotel</small> @ {todo.date}  </p></div>
                </div>
                <div className='crewRost_content'>
                   <div>
                        <h5>{doc.Origin} <br />
                        <small>{doc.Departure}</small></h5>          
                   </div>
                  <div className='crew_center'>
                    <div className='crew_flight'>
                    <small>{doc.FlightNumber}  </small>
                    </div>
                    <div className='crewRost_BS'>
                   <BsCircle size=".7em" />
                   <hr />
                   <GiCommercialAirplane size="1.7em" color='blue'/>
                   <hr />
                   <BsCircle size=".7em" />
                   </div>
                   <div className='crew_flight'>
                     <small>{doc.Duration} hrs <br /> <font className='duration'>Duration</font>  </small>
                   </div>
                  </div>
                   <div> 
                       <h5>{doc.Destination} <br />
                        <small>{doc.Arrival}</small></h5>                     
                       </div>
                </div>
                <div className='crewRost_fooder'>
                  <p><small>Pickup from Airport</small> @  {todo.date}</p>
                </div>
             </div>
              )
            })}

     
 
    </>
  )
}
