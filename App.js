import { React, useState } from "react";
import "./App.css";
import EmployeeLogin from "./Components/Employees/EmployeeLogin";
import EmployeeSignup from "./Components/Employees/EmployeeSignup";
import TimesheetForm from "./Components/TimesheetForm/TimesheetForm";
import TimesheetList from "./Components/TimesheetForm/TimesheetList";
import ManagerLogin from "./Components/Manager/ManagerLogin";
import ManagerSignup from "./Components/Manager/ManagerSignup";

function App() {
  const [route, setRoute] = useState("/");

  const renderComponent = () => {
    switch (route) {
      case "/":
        return <EmployeeSignup />;
      case "/login":
        return <EmployeeLogin />;
      case "/timesheet":
        return <TimesheetList />;
      case "/managerSignup":
        return <ManagerSignup />;
      case "/managerlogin":
        return <ManagerLogin />;
      case "/timesheetform":
        return <TimesheetForm />;
      default:
        return <EmployeeSignup />;
    }
  };

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li onClick={() => setRoute("/")}>Employee Signup</li>
            <li onClick={() => setRoute("/managerSignup")}>Manger Signup</li>
            {/* <li onClick={() => setRoute("/login")}>Employee Login</li>
            <li onClick={() => setRoute("/timesheet")}>Timesheet Form</li>
            <li onClick={() => setRoute("/managerlogin")}>Manager Login</li>
            <li onClick={() => setRoute("/timesheetform")}>
              Manager Task List
            </li> */}
          </ul>
        </nav>
      </header>
      <main>{renderComponent()}</main>
    </div>
  );
}

export default App;
