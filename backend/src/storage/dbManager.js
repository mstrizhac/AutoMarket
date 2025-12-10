require('dotenv').config();
const mongoose = require('mongoose');
const dbURL = process.env.MONGODB_URI;

const initDB = async () => {
    await mongoose.connect(dbURL)
        .then(() => console.log('Connected to storage'))
}

module.exports = {initDB};
