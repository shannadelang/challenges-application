const db = require("../models");
const UserChallenge = db.userChallenges;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.user_id) {
      res.status(400).send({
        message: "user id can not be empty!"
      });
      return;
    }
    if (!req.body.challenge_id) {
      res.status(400).send({
        message: "challenge id can not be empty!"
      });
      return;
    }

    // Create a user-challenge
  const userChallenge = {
    user_id: req.body.user_id,
    challenge_id: req.body.challenge_id,
    active: req.body.active,
    completed: req.body.completed
  };

  // Save in the database
  UserChallenge.create(userChallenge)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user challenge."
      });
    });
};

//update object
exports.update = (req, res) => {
  const userID = req.query.user;
  const challengeID = req.query.challenge;

  UserChallenge.update(req.body, {
    where:  {user_id: userID, challenge_id: challengeID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update bridge tabel. Maybe the item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating bridge tabel"
      });
    });
};

//get object by user_id and challenge_id
exports.getItem = (req, res) => {
  const userID = req.query.user;
  const challengeID = req.query.challenge;
    
  UserChallenge.findAll({ 
    where:  {user_id: userID, challenge_id: challengeID }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving with id=" + userID
      });
    });
};

exports.getActiveChallenges = (req, res) => {
  const userID = req.params.userid;
    
  UserChallenge.findAll({
    where: {
      user_id: userID,
      active: 1
    }
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving with id=" + userID
      });
    });
};

exports.getCompleteChallenges = (req, res) => {
  const userID = req.params.userid;
    
  UserChallenge.findAll({
    where: {
      user_id: userID,
      completed: 1
    }
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving complete challenges with id=" + userID
      });
    });
};