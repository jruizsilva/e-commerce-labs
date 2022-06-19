const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (base64EncodedImage) => {
  return await cloudinary.uploader.upload(base64EncodedImage, {
    upload_preset: process.env.CLOUDINARY_PRESET,
  });
};
const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};
module.exports = {
  uploadImage,
  deleteImage,
};
