import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    sassOptions: {
        includePaths: [path.join(__dirname, "src", "styles")],
        prependData: `@use "helpers";`,
    },
    productionBrowserSourceMaps: true,

    // 🚀 transpile ton package local
    transpilePackages: ["webform-components"],
};

export default nextConfig;
