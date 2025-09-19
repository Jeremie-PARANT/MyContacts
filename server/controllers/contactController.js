import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
    try
    {
        const { firstName, lastName, phone } = req.body;
        const contact = new Contact({ firstName, lastName, phone, user: req.user });

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