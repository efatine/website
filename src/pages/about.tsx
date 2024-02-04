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
import Typed from 'typed.js';
import { useEffect, useRef } from 'react'


const postDirectory = path.join(process.cwd(), 'src/data/about');

interface AboutProps {
  source: MDXRemoteSerializeResult;
}

const About: React.FC<AboutProps> = ({ source }) => {
  const adjectiveRef = useRef<Typed | null>(null);

  useEffect(() => {
    adjectiveRef.current = new Typed('.adjective-text', {

      strings: [
        'innovative', 'analytical', 'detail-oriented',
        'adaptable', 'collaborative', 'resourceful', 'efficient',
        'team-oriented', 'communicative', 'curious', 'versatile', 'proactive',
        'resilient', 'logical', 'methodical', 'open-minded', 'self-motivated',
        'fast learning', 'quality-focused', 'strategic'
      ],
      typeSpeed: 70,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      shuffle: true,
    });

    return () => {
      if (adjectiveRef.current) {
        adjectiveRef.current.destroy();
      }
    };
  }, []);

  return (
    <BlogLayout title={''} description={''}>
      <div className="flex flex-col items-center justify-center text-5xl font-bold">
        Elias Fatine
      </div>
      <div className="flex flex-row items-center mt-4 justify-center w-full prose prose-lg dark:prose-dark text-xl">
          Aspiring&nbsp;<span className="adjective-text text-xl font-semibold"></span> Software Engineer
      </div>
      <article className="max-w-none w-full mt-8 prose prose-lg dark:prose-dark">
        <MDXRemote {...source} components={{}} />
      </article>
    </BlogLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(postDirectory, `about.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

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
  });

  return {
    props: {
      source: mdxSource,
    },
  };
}

export default About;