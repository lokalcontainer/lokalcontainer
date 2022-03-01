const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        imageSizes: [
            16, 32, 48, 64, 128, 256, 384, 512, 720, 960, 1280, 1366, 1536, 1920, 2200, 2560
        ],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60
    },
    async rewrites() {
        return [
            { source: "/api/v1/:path*", destination: `${API_URL}/v1/:path*` },
            { source: "/static/:path*", destination: `${API_URL}/static/:path*` }
        ];
    }
};
