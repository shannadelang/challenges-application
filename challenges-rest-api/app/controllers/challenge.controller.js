const db = require("../models");
const Challenge = db.challenges;
const Op = db.Sequelize.Op;

/*//FIXME: pagination of server size in combi with angular not showing all the pages
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};
*/

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a challenge
  const challenge = {
    title: req.body.title,
    description: req.body.description ? req.body.description : "Oops! It seems like this challenge does not have a description.",
    category: req.body.category ? req.body.category : "other",
    author: req.body.author,
    level: req.body.level ? req.body.level : 1,
    public: req.body.public ? req.body.public : false
  };

  // Save challenge in the database
  Challenge.create(challenge)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the challenge."
      });
    });
};

//Retrieve all Challenges/ find by title
exports.findAllByTitle = (req, res) => {
    //const { page, size } = req.query;
   // const { limit, offset } = getPagination(page, size);

    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Challenge.findAll({ where: condition })
      .then(data => {
        //const response = getPagingData(data, page, limit); //pagination
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving challenges."
        });
      });
  };

  //Retrieve all Challenges/ find by category
  exports.findAll = (req, res) => {

    const category = req.query.category;
    var condition = category ? { category: { [Op.like]: `%${category}%` } } : null;
  
    Challenge.findAll({ 
      where: condition 
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving challenges."
        });
      });
  };

   //retrieve all public challenges
   exports.findAllPublic= (req, res) => {

    Challenge.findAll({ 
      where: { public: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Challenges."
        });
      });
  };

  exports.findPublicOfAdmin = (req, res) => { //shanna is admin
    var condition = [{"author": "Shanna"}, {"public": true}];
    Challenge.findAll({ 
      where: condition
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving challenges."
        });
      });
  };

  exports.findOfAuthor = (req, res) => {
    const author = req.query.author;
    console.log(author);
    var condition = author ? { author: author } : null;
    //var and = [{"author": author}, {"Key2": "Value2"}];
  
    Challenge.findAll({ 
      where: condition
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving challenges."
        });
      });
  };

  //retrieve 1 object by id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Challenge.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving challenge with id=" + id
        });
      });
  };

  //update object
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Challenge.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Challenge was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Challenge with id=${id}. Maybe Challenge was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Challenge with id=" + id
        });
      });
  };

  //delete one object
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Challenge.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Challenge was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Challenge with id=${id}. Maybe Challenge was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Challenge with id=" + id
        });
      });
  };

  //delete all objects
  exports.deleteAll = (req, res) => {
    Challenge.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Challenges were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Challenges."
        });
      });
  };
