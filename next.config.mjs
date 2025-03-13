/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        domains:['res.cloudinary.com','lh3.googleusercontent.com', 'img.clerk.com', 'source.unsplash.com', 'plus.unsplash.com'],
        unoptimized:true
    },
};

export default nextConfig;


// https://source.unsplash.com


