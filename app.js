import express from 'express';
import mongoose from "mongoose";
import urlShortnerRouter from './challenge1/route.js';
import libraryRouter from './challenge3/route.js';

const app = express();
const PORT = 8080;

// This connection string is for my local MongoDB database.
// You should replace it with your own connection string.
const DB = 'mongodb://localhost:27017/wizard-library';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DATABASE CONNECTED!!!");
  })
  .catch((error) => {
  console.error("DATABASE ERROR:", error);
});


app.use(express.json());

// In-memory store for long URLs and their corresponding short IDs
export const treasureMap = {};
export const reverseMap = {}; 

app.use('/url-shortner', urlShortnerRouter);

app.use('/wizard-library', libraryRouter);



// Start the server
app.listen(PORT, () => {
  console.log(`Magical portal system is running at http://localhost:${PORT}`);
});
