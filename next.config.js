module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['lastfm.freetls.fastly.net'],
  },  
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/efatine',
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/eliasfatine/',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.com/users/204616460797083648',
        permanent: true,
      },
    ]
  },
}
