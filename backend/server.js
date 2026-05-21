require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const router = require("./routes");

const app = express();

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

// =====================================
// DATABASE CONNECTION
// =====================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB connected"
        );
    })

    .catch((err) => {

        console.log(
            "MongoDB Error:",
            err.message
        );
    });

// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {

    return res.status(200).json({

        status: "success",

        message:
            "Welcome to backend server!"
    });
});

// =====================================
// API ROUTES
// =====================================

app.use("/api", router);

// =====================================
// GLOBAL ERROR HANDLER
// =====================================

app.use((err, req, res, next) => {

    console.error(
        "GLOBAL ERROR:",
        err
    );

    if (res.headersSent) {

        return next(err);
    }

    return res.status(500).json({

        status: "error",

        message:
            err.message ||
            "Something went wrong"
    });
});

// =====================================
// SERVER START
// =====================================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );
});