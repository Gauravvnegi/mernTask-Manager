// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ListMaker', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectToDatabase;
