/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cpsaxb6waydelzll.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
