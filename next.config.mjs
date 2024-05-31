/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // route every mapbox-gl import to @cgcs2000/mapbox-gl
    webpack: config => {
        config.resolve.alias['mapbox-gl'] = '@cgcs2000/mapbox-gl'
        return config
    },
};

export default nextConfig;
