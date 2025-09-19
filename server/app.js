import express from "express";
import swaggerJsDoc  from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express()
const port = 3000

// Database
const uri = "mongodb+srv://admin:admin@mycluster.rbheu6l.mongodb.net/mycontacts?retryWrites=true&w=majority&appName=mycluster";
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
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Middlewares
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/contact", contactRoutes);

app.listen(port, () => {
    console.log(`MyContacts API listening on port ${port}`)
})