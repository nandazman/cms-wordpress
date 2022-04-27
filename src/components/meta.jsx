import Head from 'next/head'
import { HOME_OG_IMAGE_URL } from '../lib/constants'

export default function Meta() {
  return (
    <Head>
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content="Komunitas MEA artikel"
      />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <link rel="icon" href="https://storage.googleapis.com/smarketing-prod/others/MEA-logo-small.png"></link>
    </Head>
  )
}
