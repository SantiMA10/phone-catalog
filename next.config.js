module.exports = () => {
	/**
	 * @type {import('next').NextConfig}
	 */
	const nextConfig = {
		reactStrictMode: true,
	};

	if (process.env.DEV_MODE === 'cloud') {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('dotenv').config({ path: '.env.cloud.local' });
		console.log('Using .env.cloud.local');
	}

	if (process.env.DEV_MODE === 'docker') {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('dotenv').config({ path: '.env.docker' });
		console.log('Using .env.docker');
	}

	return nextConfig;
};
