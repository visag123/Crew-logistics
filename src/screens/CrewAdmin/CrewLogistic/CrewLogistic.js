import React,{ useState, useEffect,useRef}  from 'react';
import UserDataService from "../../../firebase/userservice";

const CrewLogistic = () => {
    const [flightData,setFlightData] = useState([]);
    const [error,setError] = useState(false);
    const date = new Date().toISOString().slice(0,10)
    const [today,setDate] =useState(date);
    const [searchUsers, setSearchUsers] = useState("");
    const [departure,setDeparture] =useState('')
    const [arrival,setArrival] =useState('')
    const [from,setFrom] =useState('')
    const [flag,setFlag] =useState(false)
    const [to,setTo] =useState('')
    const searchinput = useRef();

    useEffect(() => {
        getFlightroster();
      }, []);
    const getFlightroster = async () => {
        const data = await UserDataService. getAssignFlight();
        setFlightData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }; 
      const searchHandler = (e) => {
        const searchrf = searchinput.current.value;
        setSearchUsers(searchrf);
    
      };
      const onDateChange =(e)=>{
        setDate(e.target.value)
        setError(true)
        setFlag(true)
      }
      const routeHandler = (e) => {
        e.preventDefault();
        setFlag(false)
        setError(true)
        setFrom(departure)
        setTo(arrival)
        setDeparture('')
        setArrival('')
      }
      const resetSearch = () => {
        setError(false)
        setDate(date)
        setFlag(false)
      }
  return (
    <>
      

    <div className="sys-table">
    <div className="rosterHeader">
          <div className="rosterSearch">
            <div className="rosterSearchFilter">
            <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder="Search"             
              ref={searchinput}
              value={searchUsers}
              onChange={searchHandler}
            />
            </div>
            
          </div>
          <div className="rosterFilter">
            <div className="filterDate">
              <li>Select Date</li>
              <input type="date" value={today} onChange={onDateChange} />
            </div>
           <div className="filterFlight">
              <form onSubmit={routeHandler}>
                <li>Flight Route</li>
                <input
                  type="text"
                  placeholder="Origin"
                  value={departure}
                  required
                  onChange={(e) => setDeparture(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Destination"
                  value={arrival}
                  required
                  onChange={(e) => setArrival(e.target.value)}
                />
                <button type="submit">GO</button>
                <button type="reset" onClick={resetSearch}><i className="fa-solid fa-delete-left"></i></button>
              </form>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Employee Name</th>
              <th >Flight Route</th>
              <th>Contact NO</th>             
              <th>Date</th>
              <th>Request Transport</th>
            </tr>
          </thead>
          <tbody>
            {flightData
             .filter((doc) => {
              if (searchUsers === '' && error === false){
                return doc
             }
              else if (
                error === false &&
                doc.crewMemberName.toLowerCase().includes(searchUsers.toLowerCase())
              ) {
                return doc;
              } 
              else if (from === doc.Origin.toLowerCase() && to === doc.Destination.toLowerCase()){
                return doc;
              } 
              else if (today === doc.date && flag === true){
                return doc;
              }                 
            })
            .map((doc) => {
              return (
                <tr key={doc.id}>
                  <td >{doc.crewMemberId}</td>
                  <td>{doc.crewMemberName}</td>
                  <td> {doc.Origin} - {doc.Destination}</td>
                  <td>{doc.ContactNo}</td>
                  <td className="viewRost">{doc.date}</td>
                  <td className="viewRost"><button onClick={Request}>Make Request</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CrewLogistic