const express = require('express');
const router = express.Router();

// Services
const llmService = require('./services/llmService.js');
const schedulerService = require('./services/schedulerService');

router.post('/task', async (req, res, next) => {
    try {
        const { input } = req.body;

        if (!input) {
            return res.status(400).send({
                status: 'error',
                message: 'Input is required'
            });
        }

        const parsedJson = await llmService.parseInput(input);
        const result = await schedulerService.handleTask(parsedJson);

        if (result.status === "error") {
            return res.status(400).send(result);
        }

        res.send({
            status: 'success',
            data: result
        });

    } catch (err) {
        next(err);
    }
});

router.get('/tasks', async (req, res, next) => {
    try {
        const schedule = await schedulerService.getSchedule();

        res.send({
            status: 'success',
            data: schedule
        });

    } catch (err) {
        next(err);
    }
});

router.put('/task', async (req, res, next) => {
    try {
        const taskJson = req.body;

        if (!taskJson || !taskJson.type) {
            return res.status(400).send({
                status: 'error',
                message: 'Valid task JSON with type is required'
            });
        }

        const result = await schedulerService.handleTask(taskJson);

        if (result.status === "error") {
            return res.status(400).send(result);
        }

        res.send({
            status: 'success',
            data: result
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;