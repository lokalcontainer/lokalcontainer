const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        domains: ["flagcdn.com"]
    },
    async rewrites() {
        return [{ source: "/api/v1/:path*", destination: `${API_URL}/v1/:path*` }];
    }
};
