/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env:{
    NEXT_PUBLIC_API_KEY: '9610a8710c8ae8ea34da232c5e968f47',
    BASE_URL: 'https://api.themoviedb.org/3'
  },
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
