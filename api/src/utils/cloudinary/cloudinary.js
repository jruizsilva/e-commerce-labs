const  cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

 const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'pfApp'
    })
}
const deleteImage = async(publicId) => {
    return await cloudinary.uploader.destroy(publicId)
}
module.exports = {
    uploadImage,
    deleteImage
}