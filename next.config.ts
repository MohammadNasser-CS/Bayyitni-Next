// next.config.mjs
const dev = process.env.NODE_ENV !== "production";

// Clerk keys (from env)
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";

// Security headers
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://clerk.com https://*.clerk.com ${clerkFrontendApi}
        https://cdn.jsdelivr.net
        https://maps.googleapis.com https://maps.gstatic.com
        ${dev ? "http://localhost:*" : ""};
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: blob: https: 
        https://maps.gstatic.com https://maps.googleapis.com
        https://res.cloudinary.com https://via.placeholder.com
        ${dev ? "http://localhost:*" : ""};
      font-src 'self' data: https: https://fonts.gstatic.com;
      connect-src 'self'
        https://api.clerk.dev https://clerk.com https://*.clerk.com ${clerkFrontendApi} ${backendUrl}
        https://maps.googleapis.com https://maps.gstatic.com
        ${dev ? "http://localhost:* ws://localhost:*" : ""};
      frame-src 'self' https://clerk.com https://*.clerk.com ${clerkFrontendApi};
      worker-src 'self' blob:;
    `.replace(/\s{2,}/g, " "), // cleanup whitespace
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

export default {
  reactStrictMode: true,

  // ✅ Ignore ESLint & TypeScript errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optional: allow <img> without using Next/Image optimization
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
