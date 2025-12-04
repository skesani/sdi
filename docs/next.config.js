const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [
      require('remark-math'),
    ],
    rehypePlugins: [
      require('rehype-katex'),
    ],
  },
})

module.exports = withNextra({
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    unoptimized: true,
  },
})

