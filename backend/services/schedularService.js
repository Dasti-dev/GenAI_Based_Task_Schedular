const Task = require("../models/taskModel");

async function handleTask(json) {
    if (!json || !json.type) {
        throw new Error("Invalid task format: missing type");
    }

    switch (json.type) {
        case "create":
            return await createTask(json);

        case "move":
        case "update":
            return await moveTask(json);

        case "delete":
            return await deleteTask(json);

        default:
            throw new Error(`Unsupported task type: ${json.type}`);
    }
}

async function createTask(json) {
    validateBasicFields(json);

    const slot = assignTimeSlot(json.time_preference);

    const conflict = await checkConflict(json.date, slot.start, slot.end);

    if (conflict) {
        return {
            status: "error",
            message: "Time conflict",
            conflictWith: conflict
        };
    }

    const newTask = await Task.create({
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

async function moveTask(json) {
    if (!json.id) {
        throw new Error("Task ID required");
    }

    const task = await Task.findById(json.id);

    if (!task) {
        throw new Error("Task not found");
    }

    const slot = assignTimeSlot(json.time_preference);

    const conflict = await checkConflict(
        json.date || task.date,
        slot.start,
        slot.end,
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

async function deleteTask(json) {
    if (!json.id) {
        throw new Error("Task ID required");
    }

    const deleted = await Task.findByIdAndDelete(json.id);

    if (!deleted) {
        throw new Error("Task not found");
    }

    return {
        status: "success",
        message: "Task deleted",
        task: deleted
    };
}

async function getSchedule() {
    return await Task.find().sort({ date: 1, startTime: 1 });
}

function validateBasicFields(json) {
    if (!json.task) throw new Error("Task missing");
    if (!json.date) throw new Error("Date missing");
}

function assignTimeSlot(preference) {
    if (!preference) {
        return { start: "11:00", end: "12:00" };
    }

    switch (preference) {
        case "morning":
            return { start: "09:00", end: "10:00" };

        case "afternoon":
            return { start: "14:00", end: "15:00" };

        case "evening":
            return { start: "18:00", end: "19:00" };

        default:
            return { start: "11:00", end: "12:00" };
    }
}

async function checkConflict(date, start, end, ignoreId = null) {
    const tasks = await Task.find({ date });

    return tasks.find(t => {
        if (ignoreId && t._id.toString() === ignoreId.toString()) return false;

        return (
            start < t.endTime && end > t.startTime
        );
    });
}

module.exports = {
    handleTask,
    getSchedule
};