/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/open-source",
        destination: "/labs",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: [
        "**/System Volume Information/**",
        "**/.git/**",
        "**/node_modules/**",
      ],
    };
    return config;
  },
};
export default nextConfig;
