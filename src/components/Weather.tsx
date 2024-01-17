import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useSWR from 'swr'
import { WeatherResponse } from 'types/weather'

export const Weather = () => {
  const [useCelsius, setCelsius] = useState(true)

  const { data }: { data?: WeatherResponse } = useSWR('weather')

  if (!data || !data.weather || data.weather.length === 0) return null

  const { main: weatherName, description: weatherDescription } = data.weather[0]
  const { temp: celsius } = data.main

  const fahrenheit = (celsius * 9) / 5 + 32
  const toggleTemperature = () => setCelsius((prevCelsius) => !prevCelsius)

  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <FontAwesomeIcon
        icon={
          ({
            Snow: ['fas', 'snowflake'],
            Thunderstorm: ['fas', 'thunderstorm'],
            Rain: ['fas', 'cloud-showers-heavy'],
            Drizzle: ['fas', 'cloud-rain'],
            Mist: ['fas', 'cloud-rain'],
            Clouds: ['fas', 'cloud-sun'],
            Clear: ['fas', 'cloud-sun'],
            Haze: ['fas', 'sun-haze'],
            Fog: ['fas', 'smog']
          }[weatherName] as IconProp) || ['fas', 'cloud']
        }
        className="mr-2"
      />
      It's currently{' '}
      {(celsius < 8 && <span className="mr-1">❄️</span>) ||
        (celsius > 30 && <span className="mr-1">🔥</span>)}
      <span onMouseOver={toggleTemperature} onMouseLeave={toggleTemperature} className="font-bold">
        {useCelsius ? `${Math.round(celsius)} °C` : `${Math.round(fahrenheit)} °F`}
      </span>{' '}
      <span className="text-xs">({weatherDescription})</span> in{' '}
      <a
        href="https://weather.com/en-CA/weather/today/l/45.4208777,-75.6901106"
        rel="noopener noreferrer"
        target="_blank"
        className="font-bold focus:outline-none transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200"
      >
        Ottawa
      </a>
      .
    </motion.p>
  )
}