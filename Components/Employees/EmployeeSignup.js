import React, { useState } from "react";
import "./EmployeeSignup.css";
import EmployeeLogin from "./EmployeeLogin";

const EmployeeSignup = () => {
  const [projectName, setProjectName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [date, setDate] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [reportingManager, setReportingManger] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/employee-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          taskDesc: taskDesc,
          date: date,
          timeRange: timeRange,
          reportingManager: reportingManager,
        }),
      });
      console.log(response.data);
      setProjectName("");
      setTaskDesc("");
      setDate("");
      setTimeRange("");
      setReportingManger("");
      setSubmitted(true);
    } catch (err) {
      console.log("Error submitting form ", err);
    }
  };

  // If the form is submitted, render the EmployeeLogin component
  if (submitted) {
    return <EmployeeLogin />;
  }

  return (
    <div className="signup-container">
      <h2>Employee Signup</h2>
      {!submitted ? (
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
            <label>Task description:</label>
            <input
              type="text"
              value={taskDesc}
              onChange={(e) => {
                setTaskDesc(e.target.value);
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
            <label>Reporting Manager:</label>
            <input
              type="text"
              value={reportingManager}
              onChange={(e) => {
                setReportingManger(e.target.value);
              }}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <EmployeeLogin />
      )}
    </div>
  );
};

export default EmployeeSignup;
