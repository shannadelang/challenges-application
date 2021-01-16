///FIXME: routing links logischere namen geven
module.exports = app => {
    const challenges = require("../controllers/challenge.controller.js");
    const users = require("../controllers/user.controller.js");
    const userChallenges = require("../controllers/user_challenge.controller.js");
  
    var router = require("express").Router();

    //CHALLENGES
    // Create a new challenge
    router.post("/challenges", challenges.create);
  
    // Retrieve all challenges
    router.get("/challenges/title/", challenges.findAllByTitle);

    // Retrieve all challenges/by category
    router.get("/challenges", challenges.findAll);
  
    // Retrieve all published challenges
    router.get("/challenges/public", challenges.findAllPublic);

    //retrieve all public challenges of the admin
    router.get("/challenges/default", challenges.findPublicOfAdmin);

    //retrieve by author
    router.get("/challenges/author", challenges.findOfAuthor);
  
    // Retrieve a single challenge with id
    router.get("/challenges/:id", challenges.findOne);
  
    // Update a challenge with id
    router.put("/challenges/:id", challenges.update);
  
    // Delete a challenge with id
    router.delete("/challenges/:id", challenges.delete);
  
    // Delete all challenges
    router.delete("/challenges", challenges.deleteAll);

    //USERS
    router.post("/user", users.create);
    router.put("/user/:id", users.update);
    router.get("/user", users.findAll);
    router.get("/user/:username" , users.findByUsername);
    router.get("/user/id/:id" , users.findOneById);
    // Delete a user with id
    router.delete("/user/:id", users.delete);
    // Delete all users
    router.delete("/user", users.deleteAll);

    //USERCHALLENGES
    router.post("/user/challenge", userChallenges.create);

    router.put("/userchallenge/", userChallenges.update);

    router.get("/userchallenge/", userChallenges.getItem);

    router.get("/user/activechallenges/:userid", userChallenges.getActiveChallenges);

    router.get("/user/completedchallenges/:userid", userChallenges.getCompleteChallenges);
  
    app.use('/api', router);

    //FIXME: name of file (challenges.routes) not suitable anymore: or make additional user.routers file or rename this one
  };