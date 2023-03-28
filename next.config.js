/** @type {import('next').NextConfig} */
const withTM= require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])


const nextConfig = {
  experimental: {
    appDir: true,
  },
}



module.exports = {
  nextConfig
}