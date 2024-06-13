const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
    console.log('data ',req.headers)
    const authheader = req.headers['authorization'];
    const token = authheader.split(' ')[1];

    console.log(token)
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    console.log(process.env.SECRET)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = decoded;
        next();
    });
}