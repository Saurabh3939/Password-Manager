const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const app = express();
const port = 3000;
const dbName = "PasswordManager";

client
  .connect()
  .then(() => console.log("Connected Successfully"))
  .catch((e) => console.error("MongoDB Connection Error:", e));
const db = client.db(dbName);

app.use(bodyParser.json());
app.use(cors());
// Get All The Passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//Save A Password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

//Delete A Password By Ids
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne({ id: password.id });
  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Server Is Listening On Port ${port}`);
});
