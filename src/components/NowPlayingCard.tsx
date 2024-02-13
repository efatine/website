import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SongImage from '@public/img/song.webp'
import { truncate } from 'lib/utils'
import Image from 'next/image'
import FadeIn from 'react-fade-in'
import { useLastFM } from 'use-last-fm'

const LASTFM_API_KEY = "b9214ac8b554733e66f584d24f0dcd89"; //process.env

import React, { useState } from 'react';

export const NowPlayingCard = () => {
  const lastFM = useLastFM('nionide', LASTFM_API_KEY!, 5000, 'large');
  const [hovered, setHovered] = useState(false);

  if (['connecting', 'error'].includes(lastFM.status)) return null;

  return (
    <FadeIn>
      <a
        href={lastFM.status === 'playing' ? `https://open.spotify.com/search/${lastFM.song.name} ${lastFM.song.artist}` : 'https://spotify.com/'}
        rel="noopener noreferrer"
        target="_blank"
        className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 p-3 rounded-md border border-gray-800 shadow flex flex-row items-center relative max-w-sm group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <FontAwesomeIcon className="fill-current text-green-500" icon={['fab', 'spotify']} />
        </div>
        <div className="flex items-center justify-center h-full">
          {lastFM.status === 'idle' && (
            <Image
              height={45}
              width={45}
              alt="Song cover art"
              placeholder="blur"
              className="w-full h-full rounded shadow"
              src={SongImage}
            />
          )}
          {lastFM.status === 'playing' && (
            <Image
              height={65}
              width={65}
              alt="Song cover art"
              className="w-full h-full rounded shadow"
              src={lastFM.song.art}
            />
          )}
        </div>
        <div className="my-auto ml-4">
          <div className="text-sm sm:text-regular relative">
            {lastFM.status === 'playing' ? (
              <>
                <div className={`transition-width transition-transform duration-300 ${hovered ? '-translate-y-2' : ''}`}>
                  Currently playing <br /> <div className="font-semibold">{truncate(lastFM.song.name, 30)}</div>
                  <div className="font-normal text-xs">
                    by {truncate(lastFM.song.artist, 30)}
                  </div>
                  <p className={`text-xxs opacity-0 group-hover:opacity-100 transition-opacity absolute ${lastFM.status === 'playing' ? 'mt-13' : ''}`}>
                    Click for more info
                  </p>

                </div>
              </>
            ) : (<div className="font-semibold">Not listening to anything</div>)}
          </div>
        </div>
      </a>
    </FadeIn>
  );
};