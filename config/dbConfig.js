const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
// const uri = "mongodb+srv://paulfashion:vV6jRZeSyx7GALir@cluster0.k8jxsp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
exports.config = async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
    //         poolSize: 20, // Increase the pool size to handle more concurrent connections
    //         serverSelectionTimeoutMS: 30000, // Increase the server selection timeout to 30 seconds
    // connectTimeoutMS: 30000,
        });
        // run().catch(console.dir);
        console.log('MongoDB Connected');
        console.log("Started application on port %d", 10000)
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};