/* eslint-disable react/no-children-prop */
import FadeIn from 'react-fade-in'
import { GenericMeta } from 'components/GenericMeta'
import { v4 as uuidv4 } from 'uuid'
import { truncate } from 'lib/utils'
import useSWR from 'swr'
import { LastFMResponse } from 'types/lastFM'
import { AlbumCard } from 'components/AlbumCard'

export default function Albums() {
  const { data }: { data?: LastFMResponse } = useSWR('topAlbums')

  return (
    <>
      <GenericMeta title="Albums" description="My top albums on Spotify." />

      {data && (
        <div className="md:px-8">
          <FadeIn>
            <div className="flex flex-col items-center justify-center text-5xl font-bold">Albums</div>
            <p className="flex flex-col items-center justify-center md:px-10 text-gray-600 dark:text-gray-400 p-3"> My top albums on Spotify 
              <span className="text-sm">(Updates automatically)</span>
            </p>
            <div
              className="rounded-lg justify-center md:justify-start
           grid grid-flow-row xs:grid-flow-col gap-6 xs:grid-rows-2 overflow-scroll no-scrollbar p-3"
            >
              {data.topalbums.album
                .filter((album) => album.image[3]['#text'])
                .map((album) => (
                  <AlbumCard
                    key={uuidv4()}
                    artist={album.artist.name}
                    name={truncate(album.name, 25)}
                    coverImage={album.image[3]['#text']}
                    href={album.url}
                  />
                ))}
            </div>
          </FadeIn>
        </div>
      )}
    </>
  )
}
