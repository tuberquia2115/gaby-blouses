import { v2 } from 'cloudinary';

v2.config(process.env.CLOUDINARY_URL ?? '');

const cloudinary = v2;

export default cloudinary;
