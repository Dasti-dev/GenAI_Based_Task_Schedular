const express = require('express');
const cors = require('cors');

const mongoose = require("mongoose");
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/scheduler")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.get('/', (req, res) => { 
    res.send({
        status: 'success', 
        message: 'Welcome to the backend server!'
    });
});

app.use("/routes", router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 'error', 
        message: err.message || 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});