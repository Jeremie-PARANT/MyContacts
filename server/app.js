import express from "express";
import swaggerJsDoc  from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import * as userController from "./controllers/userController.js";

// Const
const app = express()
const port = 3000
const uri = "mongodb+srv://admin:admin@mycluster.rbheu6l.mongodb.net/mycontacts?retryWrites=true&w=majority&appName=mycluster";

// Database
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(ex => console.log("Connection error", ex));

//Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['app.js'],
};

const openapiSpecification = swaggerJsDoc(options);

// Middlewares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// Routes
/**
 * @swagger
 * /user:
 *   get:
 *     description: Get all Users
 *     responses:
 *       200:
 *         description: Sucess
 */
app.get("/user", userController.getAllUsers);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "email"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       201:
 *         description: Created
 */
app.post("/user", userController.addUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "email"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
app.post("/login", userController.login);

app.listen(port, () => {
    console.log(`MyContacts API listening on port ${port}`)
})