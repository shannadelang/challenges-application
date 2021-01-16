module.exports = (sequelize, Sequelize) => {
    const Challenge = sequelize.define("challenges", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(430)
      },
      category: {
        type: Sequelize.STRING(18)
      },
      level: {
        type: Sequelize.TINYINT
      },
      author: {
        type: Sequelize.STRING
      },
      public: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Challenge;
  };