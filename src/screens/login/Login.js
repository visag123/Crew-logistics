import React, {  useState } from "react";
import  "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthcontext";
import UserDataService from"../../firebase/userservice";
import logo from "../../images/landscape-view.jpg"
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  const { logIn,setUserInfo } = useUserAuth();

  const clearMassage = () =>{
    setTimeout(() => {
    setMessage({ error: false, msg: "" });
  }, 3000);}
  
  const loginhandler =async (e) => {
    e.preventDefault();
    if (username==='visaga' && password ==='123456') {
      setUserInfo({initial:true , nameId:username})
        navigate("/admin")
        return;
      }
   try {
    const data = await UserDataService.getAllUsers();
     data.docs.forEach((doc) => {
       const newdata = doc.data();
       // console.log(newdata);
       if (newdata.username === username) {
         if (newdata.password === password) {
           if (newdata.status === "Active") {
             if (newdata.role === "Crew Admin") {
              setUserInfo({initial:true , nameId:username})
               navigate("/admin/crew");
             } else if (newdata.role === "Transport Admin") {
              setUserInfo({initial:true , nameId:username})
               navigate("/admin/trans");
             } else {
               navigate("/");
             }
           } else {
             setMessage({ error: true, msg: "Account Status Inactive" });
             clearMassage();
           }
         } else {
           setMessage({ error: true, msg: "Password Wrong" });
           clearMassage();
         }
       }
     });
   } catch (err) {
    setMessage({ error: true, msg:'Username Invalid' });
    clearMassage();
   }
  };

  return (
    <div className="log">
      <div className="login_header">
        {message.error ? <p>{message.msg}</p> : ""}
      </div>
      <div className="login_home">
        <img src={logo} alt="image" />
      </div>
      <div className="login_form">
        <div className="login_head">
          <h4>Member Login</h4>
        </div>
        <form onSubmit={loginhandler}>
          <div className="login_username">
            <i className="fa-solid fa-envelope"></i>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login_username">
            <i className="fa-solid fa-key"></i>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login_button">
            <Button type="submit" >
              <i className="fa-solid fa-arrow-right-to-bracket">&nbsp;&nbsp;</i>
              Login
            </Button>
          </div>
        </form>
        <div className="login_p">
          <p>Forgot Password?</p>
          <p>New User?</p>
        </div>
        <div className="login_button">
          <Link to="/signup">
            <button type="submit">
              Create new Account &nbsp;
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
