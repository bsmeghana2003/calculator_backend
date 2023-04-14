var express = require('express');
var express = require('express');
var router = express.Router();

router.post('/user/add', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var collection = req.db.collection("users");
  var dataToInsert = {
    username: username,
    password: password
  };
  collection.insertOne(dataToInsert).then(function (data) {
    if (data) {
      res.send({
        status: "Success",
        data: "User added successfully"
      });
    } else {
      res.send({
        status: "Error",
        err: "Failed to create user"
      });
    }
  })
});

router.get('/user/login', function (req, res, next) {
  var username = req.query.username;
  var password = req.query.password;
  var collection = req.db.collection("users");
  collection.findOne({ username: username, password: password }).then(function (data) {
    if (data) {
      res.send({
        status: "Success",
        data: "Correct credentials"
      });
    } else {
      res.send({
        status: "Error",
        err: "Wrong credentials"
      });
    }
  });

});

router.post('/user/history/save', function (req, res, next) {
  var entryToBeAdded = req.body.entryToBeAdded;
  var username = req.body.username;
  var collection = req.db.collection("userOperationHistory");
  var dataToInsert = {
    username: username,
    operation: entryToBeAdded
  };
  collection.insertOne(dataToInsert).then(function (data) {
    if (data) {
      res.send({
        status: "Success",
        data: "User entry added successfully"
      });
    } else {
      res.send({
        status: "Error",
        err: "Failed to create entry"
      });
    }
  })
});

router.get('/user/history', function (req, res, next) {
  var username = req.query.username;
  var collection = req.db.collection("userOperationHistory");
  console.log(username);
  collection.find({ username: username }).toArray().then(function (data) {
    if (data) {
      res.send({
        status: "Success",
        data: data
      });
    } else {
      res.send({
        status: "Error",
        err: "Failed to fetch entry"
      });
    }
  })
});


module.exports = router;