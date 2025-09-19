import express from "express";
import * as contactController from "../controllers/contactController.js";

const router = express.Router();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Create a new contact
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
 *               user:
 *                 type: string
 *                 example: "68cd1f4e499f8fe596887765"
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", contactController.addContact);

export default router;