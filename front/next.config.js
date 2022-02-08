require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	env: {
    DEV_URL: 'http://localhost:8097/rest',
    MHG_URL: 'http://164.90.143.97:8097/rest',
    DEV_MODE: 'true',
  },
}

module.exports = nextConfig