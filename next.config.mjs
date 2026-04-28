/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/sk", permanent: false },
    ];
  },
};

export default nextConfig;
