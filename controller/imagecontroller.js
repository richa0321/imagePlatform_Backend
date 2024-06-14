
const imageModel = require('../model/imagemodel');
const userModel = require('../model/usermodel');
const s3 = require('../middleware/uploadFile')

exports.createFile = async (req, res, next) => {
  try {
    let {title, description,tags}  = req.body;
    let name;
    if(!req.body.photographer_name) {
      let userId = req.user.id
      let user = await userModel.findOne({_id: userId})
      name=user.username;
    } else {
      name = req.body.photographer_name;
    }
    let uploadedImageUrl = '';
    if(req.file) {
      const result = await s3.uploadFileToS3(req.file); // Assumes file input field name is 'file'
      uploadedImageUrl = result.Location
    }
    
    const imageData = await imageModel.create({
      title,
      description,
      tags,
      userId,
      photographer_name: name,
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

exports.fetchFileByTitle = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    let images;
    if (keyword) {
      // Search by keyword in photographer_name, description, and tags
      images = await imageModel.find({
        userId: req.user.id,
        $or: [
          { photographer_name: { $regex: keyword, $options: 'i' } },
          { title: { $regex: keyword, $options: 'i' } },
          { tags: { $regex: keyword, $options: 'i' } }
        ]
      });
    } else {
      images = await imageModel.find({userId: req.user.id});
    }
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

