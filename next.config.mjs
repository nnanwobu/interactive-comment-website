/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "egerfkhlkqpnyjsbrseo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/canbin-images/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
    // loader: "custom",
    // loaderFile: "./my-loader.js",
  },
  // output: "export",
};

export default nextConfig;
