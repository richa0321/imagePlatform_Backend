const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

exports.config = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB Connected');
        console.log("Started application on port %d", process.env.PORT); 
        console.log("The live url is ", process.env.BASE_URL)
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};