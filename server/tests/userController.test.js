import { getAllUsers, addUser, login } from "../controllers/userController.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../models/User.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("userController", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllUsers", () => {
        it("devrait renvoyer tous les utilisateurs", async () => {
            const req = {};
            const res = { json: jest.fn() };
            const fakeUsers = [{ email: "a@a.com" }, { email: "b@b.com" }];
            User.find.mockResolvedValueOnce(fakeUsers);

            await getAllUsers(req, res);

            expect(User.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(fakeUsers);
        });

        it("devrait gérer une erreur", async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error("fail");
            User.find.mockRejectedValueOnce(error);

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });

    describe("addUser", () => {
        it("devrait créer un utilisateur avec succès", async () => {
            const req = { body: { email: "test@example.com", password: "123456" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            bcrypt.hashSync.mockReturnValue("hashedPassword");
            User.prototype.save = jest.fn().mockResolvedValueOnce({});

            await addUser(req, res);

            expect(bcrypt.hashSync).toHaveBeenCalledWith("123456", 10);
            expect(User.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé avec succès" });
        });

        it("devrait gérer une erreur lors de la création", async () => {
            const req = { body: { email: "test@example.com", password: "123456" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            bcrypt.hashSync.mockReturnValue("hashedPassword");
            User.prototype.save = jest.fn().mockRejectedValueOnce(new Error("fail"));

            await addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });

    describe("login", () => {
        it("devrait connecter un utilisateur avec succès", async () => {
            const req = { body: { email: "a@a.com", password: "123456" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const fakeUser = { _id: "123", email: "a@a.com", password: "hashed" };
            User.findOne.mockResolvedValueOnce(fakeUser);
            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue("fakeToken");

            await login(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: "a@a.com" });
            expect(bcrypt.compareSync).toHaveBeenCalledWith("123456", "hashed");
            expect(jwt.sign).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: "fakeToken" });
        });

        it("devrait renvoyer 401 si utilisateur non trouvé", async () => {
            const req = { body: { email: "a@a.com", password: "123456" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockResolvedValueOnce(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Email ou mot de passe incorrect" });
        });

        it("devrait renvoyer 401 si mot de passe incorrect", async () => {
            const req = { body: { email: "a@a.com", password: "123456" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const fakeUser = { _id: "123", email: "a@a.com", password: "hashed" };
            User.findOne.mockResolvedValueOnce(fakeUser);
            bcrypt.compareSync.mockReturnValue(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Email ou mot de passe incorrect" });
        });

        it("devrait gérer une erreur lors du login", async () => {
            const req = { body: { email: "a@a.com", password: "123456" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne.mockRejectedValueOnce(new Error("fail"));

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });
});
