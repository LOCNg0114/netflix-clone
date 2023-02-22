/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // images: {
  //   domains: ['tmdb.org', 'themoviedb.org'],
  // },
  images: { 
    loader: "default", 
    minimumCacheTTL: 60, 
    domains: [ 
      "image.tmdb.org", 
      'tmdb.org', 
      'themoviedb.org'
    ],
  },
}
