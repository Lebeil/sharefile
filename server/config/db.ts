const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.hhxmw.mongodb.net/test?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err: any) => console.log("Failed to connect to MongoDB", err));