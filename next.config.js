module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        NGINX_URL: process.env.NEXT_PUBLIC_NGINX_URL,
    },
    images: {
        domains: [`${process.env.NGINX_HOST}`],
    },
};
