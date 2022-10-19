const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async() => {

    try {
        const mongoDB = "mongodb://127.0.0.1/user"
        console.log(mongoDB)
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        const db = mongoose.connection;

        db.on("error", console.error.bind(console, "MongoDB connection error:"));
        console.log('Db Connected');
        
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
};