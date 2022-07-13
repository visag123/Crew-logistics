import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/login/Login";
import Resetpassword from "./screens/resetpassword/Resetpassword";
import Signup from "./screens/signup/Signup";
import SysAdminpage from "./screens/systemAdmin/SysAdminpage";
import { UserAuthContextProvider } from "./context/UserAuthcontext";
import Editpage from "./screens/editpage/Editpage";
import Sidebar from "./components/sidebar/Sidebar";
import TransportAdmin from "./screens/transport-admin/TransportAdmin";
import CrewAdmin from "./screens/crew-admin/CrewAdmin";
import Userlist from "./screens/systemAdmin/userlist/Userlist";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Roster from "./screens/crew-admin/Roster/Roster";
import ManageCrew from "./screens/crew-admin/ManageCrew/ManageCrew";
import EditCrew from "./screens/crew-admin/manage-crewMember/Add/EditCrew";
import ViewMember from "./screens/crew-admin/ViewMember/ViewMember";

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
            </Route>
            </Route>
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
