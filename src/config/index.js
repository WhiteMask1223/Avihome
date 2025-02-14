//URL del Servidor
export const SERVER_URL = process.env.SERVER_URL || `http://localhost:3000`;

//Es local?
export const IS_DEVELOPMENT = false //process.env.NODE_ENV === "development"

//DB url
export const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017`;

//NextAuth
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

//cloundinary
export const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_API_SECRET;