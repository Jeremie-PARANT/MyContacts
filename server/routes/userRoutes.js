import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all Users
 *     responses:
 *       200:
 *         description: Sucess
 */
router.get("/", userController.getAllUsers);

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
router.post("/", userController.addUser);

/**
 * @swagger
 * /user/login:
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
router.post("/login", userController.login);

export default router;