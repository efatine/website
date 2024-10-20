import Image from 'next/image';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericMeta } from 'components/GenericMeta';
import { NowPlayingCard } from 'components/NowPlayingCard';
import { Weather } from 'components/Weather';
import { Account, AccountData } from 'data/accounts';
import { MainLayout } from 'layouts/MainLayout';
import { useTheme } from 'next-themes';
import EliasImage from '@public/img/elias.jpg';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { RefObject } from 'react';
import Head from 'next/head';  // Import Head from 'next/head'

const Time = dynamic(() => import('components/Time'), {
  ssr: true,
});

const SocialLink = ({ name, href, icon, copyEmail, downloadResume }: Account) => {
  const buttonRef: RefObject<HTMLAnchorElement> = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: name === 'Email' ? 'Copy Email' : name === 'Resume' ? 'Download Resume' : name === 'GitHub' ? 'GitHub' : name === 'LinkedIn' ? 'LinkedIn' : '',
        arrow: false,
        theme: 'light',
        placement: 'bottom',
        animation: 'shift-away',
        offset: [-20, 0],
        animateFill: true,
      });
    }
  }, [name]);

  const handleOnClick = () => {
    if (name === 'Email') {
      copyEmail();
    } else if (name === 'Resume') {
      downloadResume();
    }
  };

  return (
    <a
      aria-label={name}
      onClick={handleOnClick}
      className="cursor-pointer fill-current focus:outline-none transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      ref={buttonRef}
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

  const downloadResume = () => {
    const resumeFileName = 'Elias_Fatine_Resume.pdf'; // Adjust the file name as needed
    const resumeFileUrl = `${resumeFileName}`;
    console.log(resumeFileUrl);

    const link = document.createElement('a');
    link.href = resumeFileUrl;
    link.download = "Elias_Fatine_Resume";
    link.click();

    theme === 'dark'
      ? toast.success('Resume downloaded!', {
        style: {
          background: '#333',
          color: '#fff',
        },
      })
      : toast.success('Resume downloaded!');
  };

  return (
    <>
      <Head>
        {/* Add a style tag in the head to hide overflow */}
        <style>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
        <title>Elias Fatine</title> {/* Update the title here */}
        <GenericMeta
          title="Elias Fatine"
          description="Hello and welcome to my website! I'm Elias and I'm a third-year Computer Science student at uOttawa."
        />
      </Head>

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
              Third-year <span className="font-semibold">Computer Science Student @ uOttawa</span>.
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
              downloadResume={downloadResume}
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
