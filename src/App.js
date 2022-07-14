import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import Resetpassword from "./screens/ResetPassword/Resetpassword";
import Signup from "./screens/Signup/Signup";
import SysAdminpage from "./screens/SystemAdmin/SysAdminpage";
import { UserAuthContextProvider } from "./Context/UserAuthcontext";
import Editpage from "./screens/SystemAdmin/EditPage/Editpage";
import Sidebar from "./components/Sidebar/Sidebar";
import TransportAdmin from "./screens/TransportAdmin/TransportAdmin";
import CrewAdmin from "./screens/CrewAdmin/CrewAdmin";
import Userlist from "./screens/SystemAdmin/Userlist/Userlist";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Roster from "./screens/CrewAdmin/Roster/Roster";
import ManageCrew from "./screens/CrewAdmin/ManageCrew/ManageCrew";
import EditCrew from "./screens/CrewAdmin/ManageCrewMember/EditCrew";
import ViewMember from "./screens/CrewAdmin/ViewMember/ViewMember";
import AddCrew from "./screens/CrewAdmin/ManageCrew/AddCrew";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/sidebar" element={<Sidebar />}/>
            <Route path="/reset" element={<Resetpassword />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/admin" element={<ProtectedRoute><SysAdminpage/></ProtectedRoute>}>           
            <Route path="edit" element={<Editpage/>}/>
            <Route path="users" element={<Userlist />}/>
            <Route path="trans" element={<TransportAdmin />}/>
            <Route path="crew" element={<CrewAdmin />}>
            <Route path="roster" element={<Roster/>}/>
            <Route path="manageCrew" element={<ManageCrew/>}/>
            <Route path="viewCrew" element={<ViewMember/>}/>
            <Route path="editCrew" element={<EditCrew/>}/>
            <Route path="addCrew" element={<AddCrew/>}/>
            </Route>
            </Route>
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
