const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

// =====================================
// AUTH MIDDLEWARE
// =====================================

async function protect(req, res, next) {

    try {

        let token;

        // =====================================
        // CHECK AUTH HEADER
        // =====================================

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token =
                req.headers.authorization.split(" ")[1];
        }

        // =====================================
        // NO TOKEN
        // =====================================

        if (!token) {

            return res.status(401).send({

                status: "error",

                message: "No token provided"
            });
        }

        // =====================================
        // VERIFY TOKEN
        // =====================================

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // =====================================
        // GET USER
        // =====================================

        const user = await User.findById(
            decoded.id
        ).select("-password");

        if (!user) {

            return res.status(401).send({

                status: "error",

                message: "User not found"
            });
        }

        // =====================================
        // ATTACH USER TO REQUEST
        // =====================================

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).send({

            status: "error",

            message: "Unauthorized access"
        });
    }
}

module.exports = protect;