import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
    try
    {
        const { firstName, lastName, phone, favorite } = req.body;
        if (phone.length > 20 || phone.length < 10)
        {
            return res.status(400).json({ message: "Doit faire entre 10 et 20 caractères." });
        }

        const contact = new Contact({ firstName, lastName, phone, favorite, user: req.user });
        await contact.save();

        res.status(201).json({ message: "Contact créé avec succès" });
    }
    catch (ex)
    {
        res.status(500).json({ message: ex.message });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user });
        res.json(contacts);
    }
    catch (ex) {
        res.status(500).json({ message: ex.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const { firstName, lastName, phone, favorite, id } = req.body;
        const contact = await Contact.findById(id);

        if (req.user != contact.user) {
            res.status(401).json({ message: "Utilisateur ne correspond pas" });
        }

        if (firstName) { contact.firstName = firstName; }
        if (lastName) { contact.lastName = lastName; }
        if (phone) { contact.phone = phone; }
        if (favorite !== undefined) { contact.favorite = favorite; }

        await contact.save();
        res.status(200).json({ message: "Contact modifié avec succès" });
    }
    catch (ex) {
        res.status(500).json({ message: ex.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.body;
        const contact = await Contact.findById(id);

        if (req.user != contact.user) {
            res.status(401).json({ message: "Utilisateur ne correspond pas" });
        }

        await contact.deleteOne();
        res.status(200).json({ message: "Contact supprimé" });
    }
    catch (ex) {
        res.status(500).json({ message: ex.message });
    }
};