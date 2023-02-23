// const express = require('express')
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
import connection from "./config/connectDB";
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initApiRoute(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});