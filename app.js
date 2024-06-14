const express = require('express');
const bodyparser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
const imageRoutes = require('./routes/imageRoutes')
const dbConfig = require('./config/dbConfig');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const cors = require('cors')
const app = express();
const port = process.env.PORT;
app.use(cors());
// app.get('/', (req,res,next) => {
//     res.send('Welcome to backend')
// })
app.use(bodyparser.json());
app.use(express.json());

app.use(userRoutes);
app.use(imageRoutes);

app.listen(port, dbConfig.config)