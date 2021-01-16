const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.challenges = require("./challenge.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.userChallenges = require("./user_challenges.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.challenges, {
  through: "user_challenges",
  as: "challenges",
  foreignKey: "user_id",
});
db.challenges.belongsToMany(db.users, {
  through: "user_challenges",
  as: "users",
  foreignKey: "challenge_id",
});

module.exports = db;