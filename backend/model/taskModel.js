const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["low", "mid", "high"],
        default: "mid"
    },

    status: {
        type: String,
        enum: ["pending", "completed", "missed"],
        default: "pending"
    },

    recurrence: {
        type: String,
        enum: ["none", "daily", "weekly", "monthly", "yearly"],
        default: "none"
    },

    constraints: {
        type: [String],
        default: []
    },

    remarks: {
        type: String,
        default: ""
    },

    reasonForIncompletion: {
        type: String,
        default: null
    },

    source: {
        type: String,
        enum: ["llm", "manual"],
        default: "llm"
    }
}, {
    timestamps: true // adds createdAt, updatedAt
});

module.exports = mongoose.model("Task", taskSchema);