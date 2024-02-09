import { Project } from 'data/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const Sparkle = dynamic(() => import('react-sparkle'), { ssr: false });

export const ProjectCard = ({ title, description, href, icon }: Project) => {
  const isPersonalWebsite = title === 'Personal Website';
  const { resolvedTheme } = useTheme();

  // Conditionally set sparkle color based on the theme
  const sparkleColor = resolvedTheme === 'dark' ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)';

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-102.5 flex flex-col sm:flex-row text-center sm:text-left px-8 sm:px-6 py-6 rounded-md border border-gray-800 shadow max-w-2xl relative"
    >
      {isPersonalWebsite && (
        <Sparkle
          color={sparkleColor}
          count={15}
          fadeOutSpeed={10}
          minSize={5}
          maxSize={10}
          flicker={false}
          flickerSpeed="fastest"
        />
      )}
      <div className="flex items-center justify-center text-4xl w-full sm:w-1/12 mr-6 mb-4 sm:mb-0">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="flex flex-col items-center sm:items-start w-full sm:w-11/12">
        <div className="flex gap-2 items-center">
          <div className="font-bold">{title}</div>
          {href && <FontAwesomeIcon size="sm" icon={['fas', 'external-link']} />}
        </div>
        <div className="text-gray-600 dark:text-gray-300">{description}</div>
      </div>
    </a>
  );
};
