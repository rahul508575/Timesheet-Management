import React, { useState, useEffect } from "react";
import "./TimesheetList.css";

const TimesheetList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getEmployeeData");
        const data = await response.json();
        setTasks(data); // Set the retrieved data to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when the component mounts
  }, []); // Empty dependency array means it only runs once on mount


  
  return (
    <div className="timesheet-container">
      <h2>Task List</h2>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time Range</th>
            <th>Reporting Manager</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.projectName}</td>
              <td>{task.taskDesc}</td>
              <td>{task.date}</td>
              <td>{task.timeRange}</td>
              <td>{task.reportingManager}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetList;
