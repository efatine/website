import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

interface Props {
  title: string
  description: string
}

export const GenericMeta = ({ title, description }: Props) => {
  return (
    <Head>
      <Analytics/>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
    </Head>
  )
}
