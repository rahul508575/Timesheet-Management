import React, { useState, useEffect } from "react";
import "./TimesheetList.css";

const TimesheetForm = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getManagerData");
        const data = await response.json();
        console.log("Data", data);
        setTasks(data); // Set the retrieved data to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when the component mounts
  }, []); // Empty dependency array means it only runs once on mount

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/updateManagerData/${updatedData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        handleUpdate(); // Update the task list after successful update
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setEditingTask(null); // Close the edit form after update
    }
  };

  return (
    <div className="timesheet-container">
      <h2>Report List</h2>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Project Name</th>
            <th>Date</th>
            <th>Time Range</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>Rahul</td>
              <td>{task.projectName}</td>
              <td>{task.date}</td>
              <td>{task.timeRange}</td>
              <td>{task.rateing}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTask && (
        <tr>
          <td>
            <input
              type="text"
              value={editingTask.projectName}
              onChange={(e) =>
                setEditingTask({ ...editingTask, projectName: e.target.value })
              }
            />
          </td>
          {/* Add a cell for the date input */}
          <td>
            <input
              type="text"
              value={editingTask.date}
              onChange={(e) =>
                setEditingTask({ ...editingTask, date: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editingTask.timeRange}
              onChange={(e) =>
                setEditingTask({ ...editingTask, timeRange: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              value={editingTask.rateing}
              onChange={(e) =>
                setEditingTask({ ...editingTask, rateing: e.target.value })
              }
            />
          </td>
          <td>
            {/* Add a submit button to update the data */}
            <button className="btn" onClick={() => handleUpdate(editingTask)}>
              Update
            </button>
          </td>
        </tr>
      )}
    </div>
  );
};

export default TimesheetForm;
