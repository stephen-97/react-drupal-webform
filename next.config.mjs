const nextConfig = {
    async headers() {
        return [
            {
                source: "/_next/static/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
                ],
            },
        ];
    },
    productionBrowserSourceMaps: true,
};

export default nextConfig;