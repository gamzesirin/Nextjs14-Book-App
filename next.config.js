/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	api: {
		bodyParser: true
	},
	env: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL
	}
}

module.exports = nextConfig
