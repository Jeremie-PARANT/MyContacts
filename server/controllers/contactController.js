import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
    try
    {
        const { firstName, lastName, phone, user } = req.body;
        const contact = new Contact({ firstName, lastName, phone, user });

        await contact.save();
        res.status(201).json({ message: "Contact créé avec succès" });
    }
    catch (ex)
    {
        res.status(500).json({ message: ex.message });
    }
};