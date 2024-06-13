const express = require('express');
const imageController = require('../controller/imagecontroller');
const auth = require('../middleware/userAuthorization')

const router = express.Router();

const multer = require('multer');
// Set up Multer
const upload = multer({ dest: 'uploads/' });

// Route for file upload
router.post('/upload', auth.verifyToken, upload.single('file'), imageController.createFile);
router.get('/fetchImages', auth.verifyToken, imageController.fetchFile);
router.get('/fetchImagesByTitle', auth.verifyToken, imageController.fetchFileByTitle);
router.delete('/delete/:id', auth.verifyToken, imageController.deleteFile);

module.exports = router;