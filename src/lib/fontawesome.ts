import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faGithub, faSpotify, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import {
  faCalendarDay,
  faEnvelope,
  faGlobeEurope,
  faGlobeAmericas,
  faCalendar,
  faSearch,
  faSnowflake,
  faNewspaper,
  faCaretDown as faSolidCaretDown,
  faA,
} from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import {
  faFile,
  faCaretDown,
  faCaretRight,
  faClipboard,
  faCloud,
  faHotel,
  //faCloud,
  faArrowUp,
  faCloudRain,
  faBicycle,
  faSmog,
  faCloudShowersHeavy,
 // faCloudSnow,
  faCloudSun,
 // faClouds,
  faDotCircle,
  faExternalLink,
  faHomeLgAlt,
  faLightbulb,
  faMoon,
  //faSnooze,
 // faStars,
  //faSunHaze,
  faTachometer,
  faThunderstorm,
} from '@fortawesome/free-solid-svg-icons'

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css'
// Prevent Font Awesome from adding its CSS since we did it manually above:
config.autoAddCss = false

// Import @fortawesome/free-brands-svg-icons
library.add(faTwitter, faGithub, faDiscord, faSpotify, faLinkedin)

// Import @fortawesome/free-solid-svg-icons
library.add(faEnvelope, faSearch,   faNewspaper, faCalendarDay, faGlobeEurope, faSolidCaretDown, faGlobeAmericas)

// Import @fortawesome/free-regular-svg-icons
library.add(faClock, faCalendar)

// Import @fortawesome/pro-regular-svg-icons
library.add(
    faCloud,
 // faClouds,
  faLightbulb,
  faTachometer,
  faFile,
  faMoon,
  faBicycle,
  faHomeLgAlt,
  faCaretDown,
  faCaretRight,
  faSnowflake,
  faSmog,
  faArrowUp,
  faHotel,
  faDotCircle,
 // faStars,
 // faSnooze,
 // faCloudSnow,
  faThunderstorm,
  faCloudShowersHeavy,
  faCloudRain,
  faCloudSun,
 // faSunHaze,
  faClipboard,
  faExternalLink
)

// Import @fortawesome/pro-duotone-svg-icons
library.add(faSun)
