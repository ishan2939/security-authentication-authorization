const mongoose = require("mongoose");

exports.connect_to_DB = () => {
    mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }) 
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((err) => {
        console.log("Can't connect to dabase due to some error:");
        console.log(err);
    })
}