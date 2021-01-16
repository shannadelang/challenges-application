module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING(130)
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      }
    });
  
    return Users;
  };