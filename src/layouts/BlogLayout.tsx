import { ReactNode, useEffect } from 'react';
import { GenericMeta } from 'components/GenericMeta';
import FadeIn from 'react-fade-in';
import { Link, Events, animateScroll as scroll, scroller } from 'react-scroll';
import { Analytics } from '@vercel/analytics/react';

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}

export const BlogLayout = ({ children, title, description }: Props) => {
  useEffect(() => {
    // Initialize scroll events
    Events.scrollEvent.register('begin', function () {
      console.log('Smooth scrolling has started');
    });
    Events.scrollEvent.register('end', function () {
      console.log('Smooth scrolling has ended');
    });

    // Cleanup scroll events on component unmount
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollToElement = (element: string) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <>
      <GenericMeta title={title} description={description} />
      <Analytics />
      <FadeIn className="flex flex-col justify-center max-w-3xl mx-auto mb-16 sm:px-0">
        <h1 className="text-5xl font-bold mr-4">
          <Link to="/" onClick={scrollToTop}>
            {title}
          </Link>
        </h1>
        {children}
      </FadeIn>
    </>
  );
};
