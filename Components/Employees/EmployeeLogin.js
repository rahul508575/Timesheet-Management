import React, { useState } from "react";
import "./EmployeeLogin.css";
import TimesheetList from "../TimesheetForm/TimesheetList";

const EmployeeLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/employee-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empName: name,
          password: password,
        }),
      });
      console.log(response.data);
      setName("");
      setPassword("");
      setSubmitted(true);
      // history.push("/login");
    } catch (err) {
      console.log("Error submitting from ", err);
    }
  };

  return (
    <>
      {!submitted ? (
        <div className="login-conatiner">
          <h2>Employee login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <TimesheetList />
      )}
    </>
  );
};

export default EmployeeLogin;
