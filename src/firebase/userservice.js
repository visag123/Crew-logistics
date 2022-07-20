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
const crewCollectionRef = collection(db, "roster");
const crewMemberCollectionRef = collection(db, "crew member");
const cabDriverCollectionRef = collection(db, "cabdrivers");
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
  
  getCrewusers = ()=>{
    return getDocs(crewCollectionRef);

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
  
  
}
export default new UserDataService();
