import { useState, useEffect } from 'react';
import { BlogLayout } from 'layouts/BlogLayout';
import { getAllPostSlugs, getPostData } from 'lib/posts';
import { MDXComponents } from 'components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
//@ts-ignore
import rehypePrism from '@mapbox/rehype-prism';
import matter from 'gray-matter';
import Image from 'next/image';
import EliasImage from '@public/img/elias.jpg';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'lodash';

export default function Posts({
  source,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const { theme } = useTheme();

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

    setScrollProgress(scrollPercentage);

    // Show the scroll-to-top button once the user starts scrolling
    if (!showScrollToTopButton && scrollPercentage > 10) {
      setShowScrollToTopButton(true);
    } else if (showScrollToTopButton && scrollPercentage <= 10) {
      setShowScrollToTopButton(false);
    }
  };

  const debouncedScrollToTop = debounce(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300); // Adjust the debounce delay as needed

  const handleButtonClick = () => {
    setIsButtonPressed(true);
    debouncedScrollToTop();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showScrollToTopButton]);

  const buttonColor = theme === 'light' ? 'bg-black' : 'bg-white';
  const arrowColor = theme === 'light' ? 'text-white' : 'text-black';
  const activeButtonColor = theme === 'light' ? 'bg-gray-800' : 'bg-gray-200';

  return (
    <BlogLayout title={frontMatter.title} description={frontMatter.excerpt}>
      <div
        className={`fixed top-0 left-0 right-0 h-0.5 ${buttonColor}`}
        style={{ width: `${scrollProgress}%` }}
      ></div>
      <div className="mt-6 flex flex-row items-center">
        <Image
          className="rounded-full"
          src={EliasImage}
          alt="elias profile picture"
          width={24}
          height={24}
        />
        <p className="ml-2">
          <a
            className="focus:outline-none transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200"
            href="https://www.linkedin.com/in/eliasfatine/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {frontMatter.author}
          </a>{' '}
          • published on {frontMatter.date} • {frontMatter.readingTime.text}
        </p>
      </div>
      <article className="max-w-none w-full mt-8 prose prose-lg dark:prose-dark">
        <MDXRemote {...source} components={MDXComponents} />
      </article>
      <button
        onClick={handleButtonClick}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-md hover:shadow-lg transition-opacity duration-300 ease-in-out ${
          isButtonPressed ? activeButtonColor : buttonColor
        } ${arrowColor} ${
          showScrollToTopButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          borderRadius: '50%', // Make the button more circular
          width: '60px',  // Adjust width as needed
          height: '60px', // Adjust height as needed
        }}
      >
        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
      </button>
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params;
  const postContent = await getPostData(params.slug);
  const { data, content } = matter(postContent);
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
      frontMatter: { readingTime: readingTime(content), ...data },
    },
  };
};
