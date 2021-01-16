module.exports = (sequelize, Sequelize) => {
    const UserChallenges = sequelize.define("user_challenges", {
      active: {
        type: Sequelize.BOOLEAN
      },
      completed: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return UserChallenges;
  };