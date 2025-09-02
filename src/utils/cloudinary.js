import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError.js';

// Initialize Cloudinary configuration when the function is called
const configureCloudinary = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment variables are not properly configured');
  }
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};

export const uploadToCloudinary = async (filepath) => {
    try {
        // Configure Cloudinary before using it
        configureCloudinary();
        
        if(!filepath)
            throw new ApiError(400, "file not found")    
        const result = await cloudinary.uploader.upload(filepath, {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        })

        return result.url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new ApiError(500, error?.message || "Error uploading file to Cloudinary");
    }
}
