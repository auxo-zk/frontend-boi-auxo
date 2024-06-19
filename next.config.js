/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{ hostname: 'storage.googleapis.com' }],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/explorer',
                permanent: false, // save cached redirect
            },
        ];
    },
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            o1js: require('path').resolve('node_modules/o1js'),
        };
        config.experiments = { ...config.experiments, topLevelAwait: true };
        config.optimization.minimizer = [];
        return config;
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
