import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

//App Config
const app = express();
const port = process.env.PORT || 8000;
const connection_url =
  "mongodb+srv://admin:admin@cluster0.zdjthll.mongodb.net/?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, (err) => {
  if (err) {
    console.log("db connection error");
  } else {
    console.log("db connected successfully");
  }
});

//API Endpoints
app.get("/", (req, res) =>
  res.status(200).send("<h1>tinder mern project <h1>")
);

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

//Listeners
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
