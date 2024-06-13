const express = require('express');
const userController = require('../controller/usercontroller');
const router = express.Router()

router.get('/', (req,res,next) => {
    res.send('Welcome to backend')
})

router.post('/signup', userController.userRegister);
router.post('/login', userController.userlogin);

module.exports = router;