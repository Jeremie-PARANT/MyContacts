import { addContact, getContacts, updateContact, deleteContact } from "../controllers/contactController.js";
import Contact from "../models/Contact.js";

jest.mock("../models/Contact.js");

describe("contactController", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("addContact", () => {
        it("devrait créer un contact avec succès", async () => {
            const req = { body: { firstName: "John", lastName: "Doe", phone: "0123456789", favorite: true }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Contact.prototype.save = jest.fn().mockResolvedValueOnce({});

            await addContact(req, res);

            expect(Contact.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Contact créé avec succès" });
        });

        it("devrait renvoyer 400 si le téléphone est trop court ou trop long", async () => {
            const req = { body: { firstName: "John", lastName: "Doe", phone: "123", favorite: false }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await addContact(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Doit faire entre 10 et 20 caractères." });
        });

        it("devrait gérer une erreur serveur", async () => {
            const req = { body: { firstName: "John", lastName: "Doe", phone: "0123456789", favorite: false }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Contact.prototype.save = jest.fn().mockRejectedValueOnce(new Error("fail"));

            await addContact(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });

    describe("getContacts", () => {
        it("devrait renvoyer tous les contacts d'un utilisateur", async () => {
            const req = { user: "user123" };
            const res = { json: jest.fn() };

            const fakeContacts = [{ firstName: "John" }, { firstName: "Jane" }];
            Contact.find.mockResolvedValueOnce(fakeContacts);

            await getContacts(req, res);

            expect(Contact.find).toHaveBeenCalledWith({ user: "user123" });
            expect(res.json).toHaveBeenCalledWith(fakeContacts);
        });

        it("devrait gérer une erreur serveur", async () => {
            const req = { user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Contact.find.mockRejectedValueOnce(new Error("fail"));

            await getContacts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });

    describe("updateContact", () => {
        it("devrait mettre à jour un contact avec succès", async () => {
            const req = { body: { id: "contact123", firstName: "Jane" }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const fakeContact = { user: "user123", save: jest.fn() };

            Contact.findById.mockResolvedValueOnce(fakeContact);

            await updateContact(req, res);

            expect(Contact.findById).toHaveBeenCalledWith("contact123");
            expect(fakeContact.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Contact modifié avec succès" });
        });

        it("devrait renvoyer 401 si l'utilisateur ne correspond pas", async () => {
            const req = { body: { id: "contact123", firstName: "Jane" }, user: "user999" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const fakeContact = { user: "user123", save: jest.fn() };

            Contact.findById.mockResolvedValueOnce(fakeContact);

            await updateContact(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur ne correspond pas" });
        });

        it("devrait gérer une erreur serveur", async () => {
            const req = { body: { id: "contact123", firstName: "Jane" }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Contact.findById.mockRejectedValueOnce(new Error("fail"));

            await updateContact(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });

    describe("deleteContact", () => {
        it("devrait supprimer un contact avec succès", async () => {
            const req = { body: { id: "contact123" }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const fakeContact = { user: "user123", deleteOne: jest.fn().mockResolvedValueOnce({}) };

            Contact.findById.mockResolvedValueOnce(fakeContact);

            await deleteContact(req, res);

            expect(Contact.findById).toHaveBeenCalledWith("contact123");
            expect(fakeContact.deleteOne).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Contact supprimé" });
        });

        it("devrait renvoyer 401 si l'utilisateur ne correspond pas", async () => {
            const req = { body: { id: "contact123" }, user: "user999" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const fakeContact = { user: "user123", deleteOne: jest.fn() };

            Contact.findById.mockResolvedValueOnce(fakeContact);

            await deleteContact(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur ne correspond pas" });
        });

        it("devrait gérer une erreur serveur", async () => {
            const req = { body: { id: "contact123" }, user: "user123" };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Contact.findById.mockRejectedValueOnce(new Error("fail"));

            await deleteContact(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "fail" });
        });
    });

});
