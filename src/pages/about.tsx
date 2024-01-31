import { MainLayout } from 'layouts/MainLayout'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXComponents } from 'components/MDXComponents'
//@ts-ignore
import rehypePrism from '@mapbox/rehype-prism'
import { BlogLayout } from 'layouts/BlogLayout'

const postDirectory = path.join(process.cwd(), 'src/data/about')

interface AboutProps { 
  source: MDXRemoteSerializeResult
}

const About: React.FC<AboutProps> = ({ source }) => {
  return (
    <BlogLayout title={''} description={''}     
    >
       <article className="max-w-none w-full mt-8 prose prose-lg dark:prose-dark">
        <MDXRemote {...source} components={MDXComponents} />
      </article>
    </BlogLayout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(postDirectory, `about.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(fileContents)

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [rehypePrism],
    },
  })

  return {
    props: {//
      source: mdxSource,
    },
  }
}

export default About
