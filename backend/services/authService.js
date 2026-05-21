const bcrypt = require("bcryptjs");

const User = require("../model/userModel");

const generateToken = require("../utils/generateToken");

// =====================================
// SIGNUP
// =====================================

async function signup(name, email, password) {

    const existingUser =
        await User.findOne({ email });

    if (existingUser) {

        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
        await bcrypt.hash(password, salt);

    const user = await User.create({

        name,
        email,
        password: hashedPassword
    });

    return {

        _id: user._id.toString(),

        name: user.name,

        email: user.email,

        token: generateToken(
            user._id.toString()
        )
    };
}

// =====================================
// LOGIN
// =====================================

async function login(email, password) {

    const user =
        await User.findOne({ email });

    if (!user) {

        throw new Error(
            "Invalid credentials"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {

        throw new Error(
            "Invalid credentials"
        );
    }

    return {

        _id: user._id.toString(),

        name: user.name,

        email: user.email,

        token: generateToken(
            user._id.toString()
        )
    };
}

module.exports = {
    signup,
    login
};