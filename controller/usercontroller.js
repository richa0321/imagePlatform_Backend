const userModel = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

const hashUsersPassword = async ( password ) => {
    return await bcrypt.hash(password, 8)
}

const verifyPassword = async ( password, hashed_password ) => {
    return await bcrypt.compare(password, hashed_password)
}


exports.userRegister = async (req, res, next) => {
        try {
            const { username, password, email } = req.body;

            const userData = await userModel.findOne({email: email})
            if(userData) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already exist'
                });
            }


            const newPass = await hashUsersPassword(password);
            const user = await userModel.create({
                username,
                password: newPass,
                email
            });

            if (!user) {
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred while creating the user.'
                });
            }

            const userSave = await user.save();

            if (!userSave) {
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred while saving the user.'
                });
            }

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
};


exports.userlogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userData = await userModel.findOne({ email: email });
            if (!userData) {
                return res.status(401).json({
                    success: false,
                    message: 'Email does not exist'
                });
            }
            const passMatch = await verifyPassword(password, userData.password);

            if (!passMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Incorrect Password'
                });
            }
            const payload = { id: userData._id, email: userData.email };
            const token = jwt.sign(payload, process.env.SECRET);
            
            res.status(200).json({
                success: true,
                message: 'Logged In successfully',
                data: userData,
                token
            });
        } catch (error) {
            next(error);
        }
}
