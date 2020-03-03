const Joi = require("joi");
const express = require("express");

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://mongoUser:mongoUserPassword@logambikai-s-hcad1.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
const portValue = process.env.port || 4000;
app.listen(portValue, lis => console.log(`Listening to Port = ${portValue}`));
let employees = [
  {
    id: "1",
    employee_name: "Tiger Nixon",
    employee_salary: "320800",
    employee_age: "61",
    profile_image: ""
  },
  {
    id: "2",
    employee_name: "Garrett Winters",
    employee_salary: "170750",
    employee_age: "63",
    profile_image: ""
  },
  {
    id: "3",
    employee_name: "Ashton Cox",
    employee_salary: "86000",
    employee_age: "66",
    profile_image: ""
  },
  {
    id: "4",
    employee_name: "Cedric Kelly",
    employee_salary: "433060",
    employee_age: "22",
    profile_image: ""
  },
  {
    id: "5",
    employee_name: "Airi Satou",
    employee_salary: "162700",
    employee_age: "33",
    profile_image: ""
  },
];

//Get Method
app.get("/", (req, res) => {
  res.send("Hello response");
});
app.get("/api/employees", (req, res) => {
  res.send(employees);
});

app.get("/api/employees/:id", (req, res) => {
  const employee = employees.find(emp => emp.id === req.params.id);
  if (!employee)
    res.status(404).send("Sorry!!!! The requested Item does not exist ");
  res.send(employee);
});

//Post Method

app.post("/api/employees/create", (req, res) => {
  const result = validateEmployee(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const employee = {
    id: (employees.length + 1).toString(),
    employee_name: req.body.employee_name,
    employee_salary: req.body.employee_salary,
    employee_age: req.body.employee_age,
    profile_image: req.body.profile_image
  };
  employees.push(employee);
  res.send(employee);
});

//Put method
app.put("/api/employees/update/:id", (req, res) => {
  const employee = employees.find(employee => employee.id === req.params.id);
  if (!employee)
    res.status(404).send("Sorry!!!! The requested Item does not exist ");

  const result = validateEmployee(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  employee.employee_name = req.body.employee_name;
  employee.employee_salary = req.body.employee_salary;
  employee.employee_age = req.body.employee_age;
  employee.profile_image = req.body.profile_image;

  res.send(employee);
});

//Delete Method

app.delete("/api/employees/delete/:id", (req, res) => {
  const employee = employees.find(employee => employee.id === req.params.id);
  if (!employee) res.send("The item has already been removed!!!");
  employees.splice(employees.indexOf(employee), 1);
  res.send(employees);
});

function validateEmployee(employee) {
  const schema = {
    employee_name: Joi.string()
      .required(),
    employee_salary: Joi.number().required(),
    employee_age: Joi.number().required()
      .min(18)
      .max(70),
    profile_image: Joi.optional()
  };
  return Joi.validate(employee, schema);
}
