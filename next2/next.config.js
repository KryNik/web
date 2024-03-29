/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
  async api(proxy) {
    proxy.on('proxyReq', async (proxyReq, req) => {
      if (req.method === 'POST') {
        proxyReq.setHeader('Content-Length', JSON.stringify(req.body).length);
      }
    });
  },
};

