import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./src/app/app.js";

dotenv.config();

const port = process.env.PORT || 2001;
const databaseURL = process.env.DATABASE_URL;

app.get("/", (req, res) => {
  res.send(`
    <html">
      <head>
        <title>API Status</title>
        <script>
          function updateTime() {
            const date = new Date();
            const idn = new Intl.DateTimeFormat('id-ID', {
              dateStyle: 'full',
              timeStyle: 'long',
              timeZone: 'Asia/Jakarta',
            }).format(date);
            document.getElementById("timestamp").textContent = idn;
          }
          setInterval(updateTime, 1000);
        </script>
      </head>
      <body style="font-family: Arial, sans-serif; background:#9118e2; color:#ffffff; text-align: center; width:100%; height:100vh; display:flex; justify-content:center; align-items:center; overflow:hidden;">
        <h1 ">API is running</h1>
        <p ">Status: <strong>success</strong></p>
        <p ">Timestamp: <strong id="timestamp">${new Date().toISOString()}</strong></p>
      </body>
    </html>
  `);
});

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);

    console.log("conncect to DB");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  connectDB();

  console.log("Server is running in port " + process.env.PORT);
});
