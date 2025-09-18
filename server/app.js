import express from "express";
import mongoose from "mongoose";
import * as userController from "./controllers/userController.js";

const app = express()
const port = 3000
const uri = "mongodb+srv://admin:admin@mycluster.rbheu6l.mongodb.net/mycontacts?retryWrites=true&w=majority&appName=mycluster";

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(ex => console.log("Connection error", ex));

app.use(express.json());

app.get("/user", userController.getAllUsers);
app.post("/user", userController.addUser);
app.get("/login", userController.login);

app.listen(port, () => {
    console.log(`MyContacts API listening on port ${port}`)
})