const mongoose = require('mongoose');

const connDB = () => {
    mongoose.connect(process.env.DB_URI, {
    }).then(() => {
        console.log("Database connected successfully")
    }).catch((err) => {
        console.log("Connection failed - "+ err)
    })
}

module.exports = connDB