import React, { useState } from "react";
// import axios from "axios";

import "../Employees/EmployeeSignup.css";
import ManagerLogin from "./ManagerLogin";
const ManagerSignup = () => {
  const [empName, setEmpName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [rateing, setRateing] = useState("");
  const [date, setDate] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    console.log("Clicked,,,,,,,,,,");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/manager-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          rateing: rateing,
          date: date,
          timeRange: timeRange,
        }),
      });
      console.log(response.data);
      setProjectName("");
      setRateing("");
      setDate("");
      setSubmitted(true);
    } catch (err) {
      console.log("Error submitting from ", err);
    }
  };

  return (
    <>
      {!submitted ? (
        <div className="signup-container">
          <h2>Manager Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name:</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Time range:</label>
              <input
                type="text"
                value={timeRange}
                onChange={(e) => {
                  setTimeRange(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="text"
                value={rateing}
                onChange={(e) => {
                  setRateing(e.target.value);
                }}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      ) : (
        <ManagerLogin />
      )}
    </>
  );
};

export default ManagerSignup;
