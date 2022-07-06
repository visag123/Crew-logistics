import { createContext, useContext,useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebasecon";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [userInfo,setUserInfo] = useState({initial:false,nameId :''})
  const [usersId,setUsersid]=useState('');
  
  const getUserId=(id)=>{
    console.log('the userid ',id);
    setUsersid(id);
  }
 
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  return (
    <userAuthContext.Provider value={{ logIn, signUp, logOut,userInfo, setUserInfo,usersId,setUsersid,getUserId}}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
