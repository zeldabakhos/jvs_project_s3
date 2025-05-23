const User = require("../models/userModels")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            throw new Error("Invalid credentials")
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) {
            throw new Error("Invalid credentials")
        }
        const token = jwt.sign(
            {
                userId: foundUser._id,
            },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "24h"}
        )
        res.status(200).json(token)
    }
    catch (err) {
        res.status(401).json({ 
            message: err.message,
        })
    }
};

exports.userSignUp = async (req, res) => {
    const { firstName, email, lastName, role, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            email,
            password: hashedPassword,
            lastName,
            role,
            inventory: [],
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
