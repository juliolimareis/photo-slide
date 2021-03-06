require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	env: {
    DEV_URL: 'http://localhost:8097/rest',
    MHG_URL: '',
    DEV_MODE: 'true',
  },
}

module.exports = nextConfig