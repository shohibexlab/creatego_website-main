/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: async () => {
        return [
            {
                source: '/',
                destination: '/beta/index.html',
            },
        ]
    },
}

module.exports = nextConfig
