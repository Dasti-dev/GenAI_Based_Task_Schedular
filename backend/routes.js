const express = require("express");

const router = express.Router();

// =====================================
// SERVICES
// =====================================

const llmService = require("./services/llmService");

const schedulerService = require("./services/schedularService");

const authService = require("./services/authService");

const protect = require("./middleware/authMiddleware");

// =====================================
// SIGNUP
// =====================================

router.post("/signup", async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({

                status: "error",

                message: "All fields are required"
            });
        }

        const user = await authService.signup(
            name,
            email,
            password
        );

        return res.status(201).json({

            status: "success",

            data: user
        });

    } catch (err) {

        return next(err);
    }
});

// =====================================
// LOGIN
// =====================================

router.post("/login", async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                status: "error",

                message: "Email and password required"
            });
        }

        const user = await authService.login(
            email,
            password
        );

        return res.status(200).json({

            status: "success",

            data: user
        });

    } catch (err) {

        return next(err);
    }
});

// =====================================
// CREATE TASK
// =====================================

router.post("/task", protect, async (req, res, next) => {

    try {

        const { input } = req.body;

        if (!input) {

            return res.status(400).json({

                status: "error",

                message: "Input is required"
            });
        }

        const parsedJson =
            await llmService.parseInput(input);

        const result =
            await schedulerService.handleTask(
                parsedJson,
                req.user._id
            );

        return res.status(200).json({

            status: "success",

            data: result
        });

    } catch (err) {

        return next(err);
    }
});

// =====================================
// GET TASKS
// =====================================

router.get("/tasks", protect, async (req, res, next) => {

    try {

        const schedule =
            await schedulerService.getSchedule(
                req.user._id
            );

        return res.status(200).json({

            status: "success",

            data: schedule
        });

    } catch (err) {

        return next(err);
    }
});

// =====================================
// UPDATE / MOVE / DELETE TASK
// =====================================

router.put("/task", protect, async (req, res, next) => {

    try {

        const taskJson = req.body;

        if (!taskJson || !taskJson.type) {

            return res.status(400).json({

                status: "error",

                message:
                    "Valid task JSON with type is required"
            });
        }

        const result =
            await schedulerService.handleTask(
                taskJson,
                req.user._id
            );

        return res.status(200).json({

            status: "success",

            data: result
        });

    } catch (err) {

        return next(err);
    }
});

module.exports = router;