import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'

interface Props {
  slug: string
  date: string
  title: string
  excerpt: string
}


export const BlogCardNew = ({slug, date, title, excerpt}: Props) => {
  return (
    
    <Link key={slug} href="/blog/[slug]" passHref as={`/blog/${slug}`} className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-102.5 flex flex-col sm:flex-row text-center sm:text-left px-8 sm:px-6 py-6 rounded-md border border-gray-800 shadow max-w-2xl">
      <a 
     // href={`blog/${slug}`}
       className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-102.5 flex flex-col sm:flex-row text-center sm:text-left px-8 sm:px-6 py-6 rounded-md border border-gray-800 shadow max-w-2xl"
      >
      <div className="flex items-center justify-center text-4xl w-full sm:w-1/12 mr-6 mb-4 sm:mb-0">
        <FontAwesomeIcon icon={['fas', 'newspaper']} />
      </div>
      <div className="flex flex-col items-center sm:items-start w-full sm:w-11/12">
        <div className="flex gap-2 items-center">
          <div className="font-bold">{title}</div>
        </div>
        <div className="text-gray-600 dark:text-gray-300"><FontAwesomeIcon icon={['fas', 'calendar']} /> {date}</div>
        <div className="text-gray-600 dark:text-gray-300">{excerpt}</div>
      </div>
      </a>
      </Link>
  )
}
