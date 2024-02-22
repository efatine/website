import { ReactNode } from 'react'
import { GenericMeta } from 'components/GenericMeta'
import FadeIn from 'react-fade-in'
import { Link, Events, animateScroll as scroll, scroller } from 'react-scroll'
import { Analytics } from '@vercel/analytics/react';

interface Props {
  children: ReactNode
  title?: string
  description?: string
  margin?: boolean
}

export const MainLayout = ({ children, title, description, margin = true }: Props) => {

  const scrollToTop = () => {
    scroll.scrollToTop();
  }

  const scrollToElement = (element: string) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }

  return (
    <>
      {title && description && <GenericMeta title={title} description={description} />}
      <Analytics />
      <FadeIn className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col max-w-3xl mx-auto mb-16 sm:px-0">
          {title && (
            <h1 className="text-5xl font-bold">
              <Link to="/" onClick={scrollToTop}>
                {title}
              </Link>
            </h1>
          )}
          {description && <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
          <div className={margin ? 'mt-8' : undefined}>{children}</div>
        </div>
      </FadeIn>
    </>
  );
}
