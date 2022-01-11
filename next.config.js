module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    async rewrites() {
        return [
            {
                source: "/fonts/:path*",
                destination: "https://github.com/lokalcontainer/fonts/blob/main/:path*"
            }
        ];
    }
};
