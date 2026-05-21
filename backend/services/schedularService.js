const Task = require("../model/taskModel");

// =====================================
// MAIN HANDLER
// =====================================

async function handleTask(json, userId) {

    if (!json || !json.type) {

        throw new Error(
            "Invalid task format: missing type"
        );
    }

    switch (json.type) {

        case "create":
            return await createTask(json, userId);

        case "move":
        case "update":
            return await moveTask(json, userId);

        case "delete":
            return await deleteTask(json, userId);

        default:
            throw new Error(
                `Unsupported task type: ${json.type}`
            );
    }
}

// =====================================
// CREATE TASK
// =====================================

async function createTask(json, userId) {

    validateBasicFields(json);

    const slot = assignTimeSlot(
        json.time_preference
    );

    const conflict = await checkConflict(
        json.date,
        slot.start,
        slot.end,
        userId
    );

    if (conflict) {

        return {
            status: "error",
            message: "Time conflict",
            conflictWith: conflict
        };
    }

    const newTask = await Task.create({

        user: userId,

        task: json.task,

        date: json.date,

        startTime: slot.start,

        endTime: slot.end,

        priority: json.priority || "mid",

        recurrence: json.recurrence || "none",

        constraints: json.constraints || [],

        source: json.source || "llm"
    });

    return {

        status: "success",

        message: "Task scheduled",

        task: newTask,

        reason: "Assigned based on preference"
    };
}

// =====================================
// MOVE TASK
// =====================================

async function moveTask(json, userId) {

    if (!json.id) {

        throw new Error("Task ID required");
    }

    const task = await Task.findOne({

        _id: json.id,
        user: userId
    });

    if (!task) {

        throw new Error("Task not found");
    }

    const slot = assignTimeSlot(
        json.time_preference
    );

    const conflict = await checkConflict(

        json.date || task.date,

        slot.start,

        slot.end,

        userId,

        task._id
    );

    if (conflict) {

        return {

            status: "error",

            message: "Conflict while moving",

            conflictWith: conflict
        };
    }

    task.date = json.date || task.date;

    task.startTime = slot.start;

    task.endTime = slot.end;

    await task.save();

    return {

        status: "success",

        message: "Task updated",

        task,

        reason: "Rescheduled"
    };
}

// =====================================
// DELETE TASK
// =====================================

async function deleteTask(json, userId) {

    if (!json.id) {

        throw new Error("Task ID required");
    }

    const deleted = await Task.findOneAndDelete({

        _id: json.id,
        user: userId
    });

    if (!deleted) {

        throw new Error("Task not found");
    }

    return {

        status: "success",

        message: "Task deleted",

        task: deleted
    };
}

// =====================================
// GET SCHEDULE
// =====================================

async function getSchedule(userId) {

    return await Task.find({

        user: userId

    }).sort({

        date: 1,
        startTime: 1
    });
}

// =====================================
// VALIDATION
// =====================================

function validateBasicFields(json) {

    if (!json.task) {
        throw new Error("Task missing");
    }

    if (!json.date) {
        throw new Error("Date missing");
    }
}

// =====================================
// SLOT ASSIGNMENT
// =====================================

function assignTimeSlot(preference) {

    if (!preference) {

        return {
            start: "11:00",
            end: "12:00"
        };
    }

    switch (preference) {

        case "morning":

            return {
                start: "09:00",
                end: "10:00"
            };

        case "afternoon":

            return {
                start: "14:00",
                end: "15:00"
            };

        case "evening":

            return {
                start: "18:00",
                end: "19:00"
            };

        default:

            return {
                start: "11:00",
                end: "12:00"
            };
    }
}

// =====================================
// CONFLICT CHECK
// =====================================

async function checkConflict(
    date,
    start,
    end,
    userId,
    ignoreId = null
) {

    const tasks = await Task.find({

        date,
        user: userId
    });

    return tasks.find(t => {

        if (
            ignoreId &&
            t._id.toString() === ignoreId.toString()
        ) {
            return false;
        }

        return (
            start < t.endTime &&
            end > t.startTime
        );
    });
}

module.exports = {
    handleTask,
    getSchedule
};