//Select one db to work with:

//For SQL
const sqlDb = require("../../db/sql");
//For Mongo
const mongoDb = require("../../db/mongodb/index.js");

module.exports = {
  db: mongoDb
};
