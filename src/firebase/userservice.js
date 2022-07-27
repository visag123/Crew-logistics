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
const flightRostCollectionRef = collection(db, "flightRoster");
const assignflightCollectionRef = collection(db, "assignFlight");
const assignCrewCollectionRef = collection(db, "assignCrew");
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
  addAssignFlight = (assign) => {
    return addDoc(assignflightCollectionRef, assign);
  };
  addAssignCrew = (assignCrew) => {
    return addDoc(assignCrewCollectionRef, assignCrew);
  };
  
  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  };
  updateCrew = (id, updatedCrew) => {
    const crewDoc = doc(db, "crew member", id);
    return updateDoc(crewDoc, updatedCrew);
  };
  updateFlightRoster = (id, updatedFlight) => {
    const crewDoc = doc(db, "flightRoster", id);
    return updateDoc(crewDoc, updatedFlight);
  };
  updateAssignCrew = (id, updatedCrew) => {
    const crewDoc = doc(db, "assignCrew", id);
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
  getAssignFlight = ()=>{
    return getDocs(assignflightCollectionRef);

  }
  getCrewMember = ()=>{
    return getDocs(crewMemberCollectionRef);

  }
  getAssignCrews = ()=>{
    return getDocs(assignCrewCollectionRef);

  }
 
  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
  getCrew = (id) => {
    const crewDoc = doc(db, "crew member", id);
    return getDoc(crewDoc);
  };
  getFlightID = (id) => {
    const flightDoc = doc(db, "flightRoster", id);
    return getDoc(flightDoc);
  };
  getAssignCrewID = (id) => {
    const AssignCrew = doc(db, "assignCrew", id);
    return getDoc(AssignCrew);
  };
}
export default new UserDataService();
