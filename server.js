
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 4000;

//Requiring our models for synching
const db = require("./models");

// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


require("./routes/api-routes.js")(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



// Route for retrieving all to dos from the db
app.get("/todos", function(req, res) {
  // Find all to dos
  db.todo.find({})
    .then(function(dbTodo) {
      // If all to dos are successfully found, send them back to the client
      res.json(dbTodo);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});
// Route to post our form submission to SQL via sequelize
app.post("/submit", function(req, res) {
  // Create a new to do using req.body

// Route for saving a new to-do to the db and associating it with a to-do
  db.todo.create(req.body)
    .then(function(dbTodo) {
      console.log(dbTodo);
      // If saved successfully, send the the new to do document to the client
      res.json(dbTodo);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

