require('dotenv').config()
const express = require("express")
const cors = require('cors');
// const nearAPI = require("near-api-js");
const { nanoid } = require('nanoid');
const { ObjectId } = require('mongodb');
const { genRtcTokenUser } = require('./utils/agora.js');
const { connectDb, client } = require("./utils/db.js");
// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async function (_req, res) {
  res.send("Meta Backend API");
});

app.use('/add', async (req, res) => {
  const { a, b } = req.body;
  const rooms = client.db("meta").collection("rooms");
  const nonce = `I am signing this nonce: ${nanoid()}`;
  const result = await rooms.updateOne(
    { address: address },
    { $set: { nonce: nonce, expires: Date.now() + 604800000 } }
  );
  console.log(result);
  res.status(200).send(result);
})

app.use('/getToken', async (req, res) => {
  // const rooms = client.db("meta").collection("rooms");
  // const result = await rooms.findOne({ _id: ObjectId("61f3eb7ff128c60c5e0afd78") });
  // console.log(result);
  const result = await genRtcTokenUser('hehe', 1, 'subscriber');
  res.status(200).send(result);
})

// DB connect and listen to server
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 80, () => {
      console.log(`Server starting on port ${process.env.PORT || 80}`)
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
