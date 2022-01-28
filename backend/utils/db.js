const { MongoClient } = require('mongodb');
const db_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}\
?retryWrites=true&w=majority`;

const client = new MongoClient(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectDb = async () => {
  try {
    console.log("Starting db connection...");
    await client.connect();
    console.log("db connected!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  client: client,
  connectDb: connectDb
}
