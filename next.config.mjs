/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // route every mapbox-gl import to @cgcs2000/mapbox-gl
    // webpack: config => {
    //     config.resolve.alias['mapbox-gl'] = '@cgcs2000/mapbox-gl'
    //     return config
    // },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    // for docker
    output: "standalone",
};

export default nextConfig;
