import { addUser } from "../controllers/userController.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

jest.mock("../models/User.js");
jest.mock("bcrypt");

describe("addUser", () => {
    it("devrait créer un utilisateur avec succès", async () => {
        const req = {
            body: { email: "test@example.com", password: "123456" },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        bcrypt.hashSync.mockReturnValue("hashedPassword");
        User.prototype.save = jest.fn().mockResolvedValueOnce({});

        await addUser(req, res);

        expect(bcrypt.hashSync).toHaveBeenCalledWith("123456", 10);
        expect(User.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé avec succès" });
    });
});
