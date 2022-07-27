import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/login/Login';
import Resetpassword from './screens/resetpassword/Resetpassword';
import Signup from './screens/signup/Signup';
import SysAdminpage from './screens/systemAdmin/SysAdminpage';
import { UserAuthContextProvider } from './context/UserAuthcontext';
import Editpage from './screens/systemAdmin/EditPage/Editpage';
import Sidebar from './components/sidebar/Sidebar';
import TransportAdmin from './screens/TransportAdmin/TransportAdmin';
import CrewAdmin from './screens/CrewAdmin/CrewAdmin';
import Userlist from './screens/systemAdmin/userlist/Userlist';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import Roster from './screens/CrewAdmin/Roster/Roster';
import ManageCrew from './screens/CrewAdmin/ManageCrew/ManageCrew';
import EditCrew from './screens/CrewAdmin/ManageCrewMember/EditCrew';
import ViewMember from './screens/CrewAdmin/ViewMember/ViewMember';
import AddCrew from "./screens/CrewAdmin/ManageCrew/AddCrew";
import ManageDrivers from "./screens/TransportAdmin/Manage Drivers/ManageDrivers";
import AddDrivers from "./screens/TransportAdmin/Manage Drivers/Add Drivers";
import Viewcabs from "./screens/TransportAdmin/View Cab Details/Viewcabs";
import { CrewRost } from "./screens/CrewAdmin/Roster/CrewRost";


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
            <Route path="/admin" element={<SysAdminpage/>}>           
            <Route path="edit" element={<Editpage/>}/>
            <Route path="users" element={<Userlist />}/>
            <Route path="trans" element={<TransportAdmin />}>
            <Route path="manageDrivers" element={<ManageDrivers/>}/>
            <Route path="addDrivers" element={<AddDrivers />}/>
            <Route path="viewcabs" element={<Viewcabs/>}/>
            </Route>
            <Route path="crew" element={<CrewAdmin />}>
            <Route path="roster" element={<Roster/>}/>
            <Route path="manageCrew" element={<ManageCrew/>}/>
            <Route path="viewCrew" element={<ViewMember/>}/>
            <Route path="editCrew" element={<EditCrew/>}/>
            <Route path="addCrew" element={<AddCrew/>}/>
            <Route path="crewRost" element={<CrewRost/>}/>
            </Route>
            </Route>
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
