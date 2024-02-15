const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB

const employeeSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  taskDesc: {
    type: String,
    required: true,
  },
  timeRange: {
    type: String,
    required: true,
  },
  reportingManager: {
    type: String,
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager",
  },
});

const managerSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  rateing: {
    type: String,
    required: true,
  },
  timeRange: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ManagerLogin",
  },
});

const empLogin = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const managerLogin = new mongoose.Schema({
  managerName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("Employees", employeeSchema);
const managerModel = mongoose.model("ManagerData", managerSchema);
const emploginModel = mongoose.model("EmpLogin", empLogin);
const managerloginModel = mongoose.model("ManagerLogin", managerLogin);
mongoose
  .connect("mongodb://localhost:27017/rahuldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

// Routes
// const employeeRoutes = require("./Routes/employeeRoutes");
// const managerRoutes = require("./Routes/managerRoutes");
// const employeeModel = require("./Schema/employeeModel");

app.post("/employee-data", (req, res) => {
  console.log(req.body);

  try {
    const newData = req.body;
    const savedData = userModel.create(newData);
    res.status(201).json(savedData);
  } catch (error) {
    console.log("Error saving data", error);
  }
});

app.post("/manager-data", (req, res) => {
  console.log(req.body);
  try {
    const newData = req.body;
    const savedData = managerModel.create(newData);
    res.status(201).json(savedData);
  } catch (error) {
    console.log("Error saving data", error);
  }
});

app.post("/employee-login", (req, res) => {
  console.log(req.body);
  try {
    const newData = req.body;
    const savedData = emploginModel.create(newData);
    res.status(201).json(savedData);
  } catch (error) {
    console.log("Error saving data", error);
  }
});
app.post("/manager-login", (req, res) => {
  console.log(req.body);
  try {
    const newData = req.body;
    const savedData = managerloginModel.create(newData);
    res.status(201).json(savedData);
  } catch (error) {
    console.log("Error saving data", error);
  }
});

app.get("/getEmployeeData", (req, res) => {
  userModel.find({}).then((users) => {
    const result = res.json(users);
    console.log(result);
  });
});
app.get("/getManagerData", (req, res) => {
  managerModel.find({}).then((users) => {
    const result = res.json(users);
    console.log(result);
  });
});

app.put("/updateManagerData/:id", async (req, res) => {
  const managerId = req.params.id;
  const newData = req.body;
  try {
    const updatedData = await managerModel.findByIdAndUpdate(
      managerId,
      newData,
      { new: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    console.log("Error updating manager data:", error);
    res.status(500).json({ error: "Error updating manager data" });
  }
});
app.get("/getManagerName/:employeeId", async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const manager = await ManagerLogin.findOne({ employeeId: employeeId });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json({ managerName: manager.managerName });
  } catch (error) {
    console.error("Error fetching manager name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.use("/api/mangers", managerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
