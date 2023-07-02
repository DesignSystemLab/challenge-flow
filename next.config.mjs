/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, tls: false, net: false, child_process: false };
    return config;
  },
  images: {
    remotePatterns: [
      //firebase storage
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
      //github profile image
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      //google profile image
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
};

export default nextConfig;
