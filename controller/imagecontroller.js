
const imageModel = require('../model/imagemodel');
const userModel = require('../model/usermodel');
const s3 = require('../middleware/uploadFile')

exports.createFile = async (req, res, next) => {
    try {
      console.log(req.body, req.file, req.user)
      let {title, description,tags}  = req.body;
      console.log(tags)
      let userId = req.user.id
      let user = await userModel.findOne({_id: userId})
      const result = await s3.uploadFileToS3(req.file); // Assumes file input field name is 'file'
      const uploadedImageUrl = result.Location
      const imageData = await imageModel.create({
        title,
        description,
        tags,
        userId,
        photographer_name: user.username,
        imageUrl: uploadedImageUrl
      })
      let imageDataSave = await imageData.save();
      if(!imageDataSave) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while uploading the image.'
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Image uploaded successfully',
        data: imageDataSave
    });
    } catch (uploadError) {
      res.status(500).send(`Error uploading file to S3: ${uploadError.message}`);
    }
}
exports.fetchFile = async (req, res, next) => {
    try {
      // let id = req.params.id  
      const imageData = await imageModel.find({userId: req.user.id})
      if(!imageData) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the image.'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Image fetched successfully',
        data: imageData
    });
    } catch (uploadError) {
      res.status(500).send(`Error deleting image file: ${uploadError.message}`);
    }
}
exports.deleteFile = async (req, res, next) => {
    try {
      let fileId = req.params.id  
      const imageData = await imageModel.findOneAndDelete({_id: fileId})
      if(!imageData) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the image.'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
        data: []
    });
    } catch (uploadError) {
      res.status(500).send(`Error deleting image file: ${uploadError.message}`);
    }
}

