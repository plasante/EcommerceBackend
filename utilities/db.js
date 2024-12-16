const mongoose = require("mongoose");

module.exports.dbConnect = async() => {
    try {
        console.log(process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}