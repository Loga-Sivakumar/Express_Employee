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
  {
    id: "6",
    employee_name: "Brielle Williamson",
    employee_salary: "372000",
    employee_age: "61",
    profile_image: ""
  },
  {
    id: "7",
    employee_name: "Herrod Chandler",
    employee_salary: "137500",
    employee_age: "59",
    profile_image: ""
  },
  {
    id: "8",
    employee_name: "Rhona Davidson",
    employee_salary: "327900",
    employee_age: "55",
    profile_image: ""
  },
  {
    id: "9",
    employee_name: "Colleen Hurst",
    employee_salary: "205500",
    employee_age: "39",
    profile_image: ""
  },
  {
    id: "10",
    employee_name: "Sonya Frost",
    employee_salary: "103600",
    employee_age: "23",
    profile_image: ""
  },
  {
    id: "11",
    employee_name: "Jena Gaines",
    employee_salary: "90560",
    employee_age: "30",
    profile_image: ""
  },
  {
    id: "12",
    employee_name: "Quinn Flynn",
    employee_salary: "342000",
    employee_age: "22",
    profile_image: ""
  },
  {
    id: "13",
    employee_name: "Charde Marshall",
    employee_salary: "470600",
    employee_age: "36",
    profile_image: ""
  },
  {
    id: "14",
    employee_name: "Haley Kennedy",
    employee_salary: "313500",
    employee_age: "43",
    profile_image: ""
  },
  {
    id: "15",
    employee_name: "Tatyana Fitzpatrick",
    employee_salary: "385750",
    employee_age: "19",
    profile_image: ""
  },
  {
    id: "16",
    employee_name: "Michael Silva",
    employee_salary: "198500",
    employee_age: "66",
    profile_image: ""
  },
  {
    id: "17",
    employee_name: "Paul Byrd",
    employee_salary: "725000",
    employee_age: "64",
    profile_image: ""
  },
  {
    id: "18",
    employee_name: "Gloria Little",
    employee_salary: "237500",
    employee_age: "59",
    profile_image: ""
  },
  {
    id: "19",
    employee_name: "Bradley Greer",
    employee_salary: "132000",
    employee_age: "41",
    profile_image: ""
  },
  {
    id: "20",
    employee_name: "Dai Rios",
    employee_salary: "217500",
    employee_age: "35",
    profile_image: ""
  },
  {
    id: "21",
    employee_name: "Jenette Caldwell",
    employee_salary: "345000",
    employee_age: "30",
    profile_image: ""
  },
  {
    id: "22",
    employee_name: "Yuri Berry",
    employee_salary: "675000",
    employee_age: "40",
    profile_image: ""
  },
  {
    id: "23",
    employee_name: "Caesar Vance",
    employee_salary: "106450",
    employee_age: "21",
    profile_image: ""
  },
  {
    id: "24",
    employee_name: "Doris Wilder",
    employee_salary: "85600",
    employee_age: "23",
    profile_image: ""
  }
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
      .min(5)
      .max(30)
      .required(),
    employee_salary: Joi.number(),
    employee_age: Joi.number()
      .min(18)
      .max(70),
    profile_image: Joi.optional()
  };
  return Joi.validate(employee, schema);
}
