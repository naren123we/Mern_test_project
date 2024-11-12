import AdminLogin from "./Component/adminLogin"
import WelcomeAdmin from "./Component/WelcomeAdmin";
import CreateEmployee from "./Component/CreateEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeData from "./Component/EmployeeData";

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/welcome" element={<WelcomeAdmin />} />
      <Route path="/create_employee" element={<CreateEmployee />} />
      <Route path="/employeedata" element={<EmployeeData />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
