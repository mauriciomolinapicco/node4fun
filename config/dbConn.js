const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            //these are to avoid warnings
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;