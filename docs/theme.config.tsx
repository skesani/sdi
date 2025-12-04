import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>SDI Documentation</span>,
  project: {
    link: 'https://github.com/skesani/sdi',
  },
  docsRepositoryBase: 'https://github.com/skesani/sdi/tree/main/docs',
  footer: {
    text: (
      <span>
        SDI - Synthetic Digital Immunity © 2024 |{' '}
        <a href="https://github.com/skesani/" target="_blank" rel="noopener noreferrer">
          Created by Sasi Kesani
        </a>
      </span>
    ),
  },
  primaryHue: 220, // Blue tone like Stripe
  primarySaturation: 100,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  search: {
    placeholder: 'Search documentation...',
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  head: (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.css"
      />
    </>
  ),
}

export default config

