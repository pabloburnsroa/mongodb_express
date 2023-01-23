const { MongoClient } = require('mongodb');
let dbConnection;

module.exports = {
  // connectToDb function will connect to the MongoDB database
  connectToDb: (cb) => {
    MongoClient.connect(process.env.URI)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  // getDb will return database connection
  getDb: () => dbConnection,
};
