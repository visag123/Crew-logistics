import { db } from "./firebasecon";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");
const adminCollectionRef = collection(db, "acceptUser");
const flightRosterCollectionRef = collection(db, "roster");
const crewMemberCollectionRef = collection(db, "crew member");
const cabDriverCollectionRef = collection(db, "cabdrivers");
const flightRostCollectionRef = collection(db, "flightRoster");
class UserDataService {
  addUsers = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };
  addUser = (users) => {
    return addDoc(adminCollectionRef, users);
  };
  addCrewMember = (crew) => {
    return addDoc(crewMemberCollectionRef, crew);
  };
  addFlightData = (flight) => {
    return addDoc(flightRosterCollectionRef, flight);
  };
  addFlightRost = (flightData) => {
    return addDoc(flightRostCollectionRef, flightData);
  };
  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  };
  updateCrew = (id, updatedCrew) => {
    const crewDoc = doc(db, "crew member", id);
    return updateDoc(crewDoc, updatedCrew);
  };

  deleteUsers = (id) => {
    const userDocs = doc(db, "users", id);
    return deleteDoc(userDocs);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };
  
  getFlightRoster = ()=>{
    return getDocs(flightRosterCollectionRef);

  }
  getFlightRost = ()=>{
    return getDocs(flightRostCollectionRef);

  }
  getCrewMember = ()=>{
    return getDocs(crewMemberCollectionRef);

  }
  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
  getCrew = (id) => {
    const crewDoc = doc(db, "crew member", id);
    return getDoc(crewDoc);
  };
  addDriver =(driver)=>{
    return addDoc(cabDriverCollectionRef, driver);
  }
  getDrivers = () => {
    return getDocs(cabDriverCollectionRef);
  };
  
  
  getFlightID = (id) => {
    const flightDoc = doc(db, "flightRoster", id);
    return getDoc(flightDoc);
  };
}
export default new UserDataService();
