const jwt = require("jsonwebtoken");

function generateToken(id) {

    console.log("JWT SECRET:", process.env.JWT_SECRET);

    console.log("GENERATING TOKEN FOR:", id);

    const token = jwt.sign(

        { id: String(id) },

        String(process.env.JWT_SECRET),

        {
            expiresIn: "7d"
        }
    );

    console.log("TOKEN GENERATED");

    return token;
}

module.exports = generateToken;