import multer from 'multer';
import dotenv from 'dotenv';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = cloudinaryStorage({
  cloudinary,
  folder: 'politico',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const upload = multer({ storage });

export default upload;
