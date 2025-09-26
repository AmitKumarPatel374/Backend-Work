const express = require('express');

const app = express();

app.use(express.json());

// Array to store data
let users = [];

// GET route -> check array data
app.get("/users", (req, res) => {
  res.json(users);
});

// POST route -> add new user in array
app.post("/users", (req, res) => {
  const newUser = req.body;  // jo Postman se bheja gaya
  users.push(newUser);
  res.status(201).json({
    message: "User added successfully!",
    data: newUser,
  });
});

app.listen(3000, () => {
  console.log("runnig on port 3000");

})