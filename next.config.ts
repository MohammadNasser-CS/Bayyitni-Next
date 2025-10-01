import type { NextConfig } from "next";
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://bayyitni-laravel-2.onrender.com" // your production backend
    : "http://localhost:8000"; // your local backend

// const securityHeaders = [
//   {
//     key: "Content-Security-Policy",
//     value: `
//           default-src 'self';
//           script-src 'self' 'unsafe-inline' 'unsafe-eval'
//             https://clerk.com https://*.clerk.com https://cdn.jsdelivr.net ${clerkFrontendApi}
//             https://maps.googleapis.com https://maps.gstatic.com;
//           style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
//           img-src 'self' data: blob: https: https://maps.gstatic.com https://maps.googleapis.com;
//           font-src 'self' data: https: https://fonts.gstatic.com;
//           connect-src 'self'
//             https://api.clerk.dev https://clerk.com https://*.clerk.com ${clerkFrontendApi} ${backendUrl}
//             https://maps.googleapis.com https://maps.gstatic.com;
//           frame-src 'self' https://clerk.com https://*.clerk.com ${clerkFrontendApi};
//           worker-src 'self' blob:;
//         `.replace(/\s{2,}/g, " "),
//   },
//   {
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "X-Frame-Options",
//     value: "DENY",
//   },
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   {
//     key: "X-DNS-Prefetch-Control",
//     value: "on",
//   },
//   {
//     key: "Strict-Transport-Security",
//     value: "max-age=63072000; includeSubDomains; preload",
//   },
//   {
//     key: "Permissions-Policy",
//     value: "camera=(), microphone=(), geolocation=()",
//   },
// ];


const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
