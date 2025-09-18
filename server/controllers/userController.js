import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try
    {
        const users = await User.find();
        res.json(users);
    }
    catch (ex)
    {
        res.status(500).json({ message: ex.message });
    }
};

export const addUser = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    }
    catch (ex)
    {
        res.status(500).json({ message: ex.message });
    }
};