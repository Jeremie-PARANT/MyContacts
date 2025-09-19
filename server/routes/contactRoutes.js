import express from "express";
import * as contactController from "../controllers/contactController.js";

const router = express.Router();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Create a new contact
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Bibi"
 *               lastName:
 *                 type: string
 *                 example: "Bibi"
 *               phone:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", contactController.addContact);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get contacts from user
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: token
 *     responses:
 *       201:
 *         description: Created
 */
router.get("/", contactController.getContacts);

export default router;