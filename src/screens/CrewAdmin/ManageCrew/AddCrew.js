import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from "../../../firebase/userservice";
import Input from "../../../components/input/Input";
import { useUserAuth } from "../../../context/UserAuthcontext";
import Button from "../../../components/button/Button";

const AddCrew = () => {
  const [assignMember, setAssignMember] = useState([]);
  const [getFlightNo,setGetFlightNo] = useState('');
  const [getCrewMemId,setGetCrewMemId] = useState([]);
  const [crewMember,setCrewMember] = useState([])
  const [checkbox,setCheckbox] = useState(false);
  const { usersId,setUsersid } = useUserAuth();
  const date = new Date().toISOString().slice(0,10)
  const [todayDate,setTodayDate] = useState(date)
  const [sample,setSample] = useState([])

  const navigate = useNavigate();
  
  const editHandler = async () => {
    try {
    const docSnap = await UserDataService.getFlightID(usersId);
      // console.log("the record is :", docSnap.data());
      setGetFlightNo(docSnap.data().FlightNumber);
    
    } catch (err) {
        console.log(err);
    }
  };

  useEffect(() => {
    if (usersId !== undefined && usersId !== "") {
      editHandler();
    }
  }, [usersId]);

  const [selectedCrew, updateSelectedCrew] = useState([]);

  // const navigate = useNavigate();
  // const location = useLocation();

  
  // const selectedCrew = (doc) => {
    
  //   // updateSelectedCrew(selectedCrew =>
  //   //   selectedCrew.map(obj=>{
  //   //     if(obj.userId === doc.map(id=>id.userId)){
  //   //       return {...obj};
  //   //     }
  //   //     return {...obj,doc};
  //   //   })
  //   //   );
  // }
  const saveCrewMembers = () => {
    console.log(selectedCrew);
  }
  const handleDate = (e) => {
    console.log(e.target.value)
  }
  const handleClose = () => {
    navigate('/admin/crew/manageCrew');
  }
  useEffect(() => {

    getCrewMember();
  }, []);

  /// Fetch roster datas from the firebase ///
  const getCrewMember = async () => {
    const data = await UserDataService.getCrewMember();
    setAssignMember(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  const clearUser =()=>{
    setUsersid("")
    navigate('/admin/crew/manageCrew')
  }

  const getCrewMemberId =(id)=>{
    setGetCrewMemId(id)
    console.log(id);
    console.log(checkbox);
  }

  const crewHandler = async () => {
    try {
    const docSnap = await UserDataService.getCrew(getCrewMemId);
      console.log("the record is :", docSnap.data());
      setCrewMember(docSnap.data());
      setSample(docSnap.data())
    
    } catch (err) {
        console.log(err);
    }
  };
  useEffect(() => {
    if (getCrewMemId !== undefined && getCrewMemId !== "") {
      crewHandler();
    }
  }, [getCrewMemId]);

  { 
    const ere =  assignMember.map((doc)=>{
      if (doc.days === undefined ) {
        return doc.days
      }
      console.log(doc.days[0].date);
    })
    console.log(ere);

  }

const updateFlightNo = async () =>{
      // const assignedFlightNo ={
      //   assignedFlight:getFlightNo,
      //   date:todayDate
      // }

      const days=
        {assignflight:getFlightNo,
          date:todayDate}
  
      sample.days.push(days);
      console.log(sample);
      
      // console.log(assignMember);

      
//   try {
//     if (getCrewMemId !== undefined && checkbox === true) {
//       await UserDataService.updateCrew(getCrewMemId, sample);
//       console.log('change flight no');
//       getCrewMember();
//       setCheckbox(false)
//   }

// }catch(err){
//   console.log(err)
// }
}

  return (
    <>
      
     <div className="sys-table">
     <div className="addCrewHeader">
         <div>
           <Input 
           type="text"
           label="Flight No"
           value={getFlightNo}
           />
         </div>
         <div>
           <Input 
           type="date"
           label="Date"
           value={todayDate}
           onChange={(e)=>setTodayDate(e.target.value)}
           />
         </div>
         <div>
           <Button onClick={updateFlightNo}>Save </Button>
         </div>
         <div>
         <Button onClick={clearUser}>Cancel</Button>
         </div>
      </div>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>User ID</th>
              <th>Employee Name</th>
              <th>Gender</th>
              <th className="addReq">Additional Requests</th>
            </tr>
          </thead>
          <tbody>
            {assignMember.filter((doc) => {
                if ( doc.date !== todayDate ) {
                  return doc;
                } 
              })
            .map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getCrewMemberId(doc.id)}><input type="checkbox" onChange={(e)=> setCheckbox(e.target.checked)}/></td>
                  <td>{doc.userId}</td>
                  <td className='No_of_crew'>{doc.firstname}</td>
                  <td>{doc.gender}</td>
                  <td>{doc.addtionreq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}


export default AddCrew