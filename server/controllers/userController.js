import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        const user = new User({ email, password: hash });

        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    }
    catch (ex)
    {
        res.status(500).json({ message: ex.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user)
        {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
            return;
        }

        const passwordMatches = bcrypt.compareSync(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        var token = jwt.sign({ userId: user._id, email: user.email }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (ex) {
        res.status(500).json({ message: ex.message });
    }
};