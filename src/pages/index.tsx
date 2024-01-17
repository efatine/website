import Image from 'next/image';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericMeta } from 'components/GenericMeta';
import { NowPlayingCard } from 'components/NowPlayingCard';
import { Weather } from 'components/Weather';
import { Account, AccountData } from 'data/accounts';
import { MainLayout } from 'layouts/MainLayout';
import { useTheme } from 'next-themes';
import EliasImage from '@public/img/elias.jpg'
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
const Time = dynamic(() => import('components/Time'), {
  ssr: true,
});

const SocialLink = ({ name, href, icon, copyEmail }: Account) => {
  return (
    <a
      aria-label={name}
      onClick={() => name === 'Email' && copyEmail()}
      className="cursor-pointer fill-current focus:outline-none transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon size="1x" icon={icon ? icon : ['fab', name.toLowerCase() as IconName]} />
    </a>
  );
};

const Home = () => {
  const { theme } = useTheme();

  const copyEmail = () => {
    navigator.clipboard.writeText('fatine.elias@gmail.com');
    theme === 'dark'
      ? toast.success('Copied email to clipboard!', {
          style: {
            background: '#333',
            color: '#fff',
          },
        })
      : toast.success('Copied email to clipboard!');
  };

  return (
    <>
      <GenericMeta
        title="Elias Fatine"
        description="22-year-old Computer Science student @ uOttawa from Ottawa, Canada."
      />

      <MainLayout margin={false}>
        <div className="flex items-center flex-col sm:flex-row text-center sm:text-left">
          <div className="rounded-full w-32 h-32 mb-4 sm:mr-4 overflow-hidden">
            <Image
              src={EliasImage}
              alt="Elias Fatine's Image"
              objectFit="cover"
            />
          </div>
          <div>
            <h1 className="text-6xl font-bold">Elias Fatine</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              22-year-old <span className="font-semibold">Computer Science Student @ uOttawa</span> from Ottawa, Ontario.
            </p>
          </div>
        </div>

        <div className="grid grid-flow-row sm:grid-flow-col w-full sm:w-48 mt-3 text-lg">
          {AccountData.map((account) => (
            <SocialLink
              key={uuidv4()}
              name={account.name}
              href={account.href}
              icon={account.icon}
              copyEmail={copyEmail}
            />
          ))}
        </div>

        <div className="grid my-4 gap-2 text-center sm:text-left">
          <Time />
          <Weather />
        </div>

        <div>
          <NowPlayingCard />
        </div>
      </MainLayout>
    </>
  );
};

export default Home;