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

/**
 * @swagger
 * /contact:
 *   patch:
 *     summary: Update contact
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
 *               id:
 *                 type: string
 *                 example: "68cd58b4f7acf9b47ef682bc"
 *     responses:
 *       200:
 *         description: Updated
 */
router.patch("/", contactController.updateContact);

/**
 * @swagger
 * /contact:
 *   delete:
 *     summary: Delete contact
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
 *               id:
 *                 type: string
 *                 example: "68cd58b4f7acf9b47ef682bc"
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/", contactController.deleteContact);

export default router;