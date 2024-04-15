import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Project {
  title: string
  description: string
  href?: string
  icon: IconProp
}

export const ProjectData: Project[] = [
  {
    title: 'Personal Website',
    description:
      "The website that you're currently on! Made with Next.js, deployed on Vercel and utilises serverless functions.",
    href: 'https://github.com/efatine/website',
    icon: ['fas', 'globe-americas'],
  },
  {
    title: 'Discord Bot Integrated with ChatGPT',
    description: "A discord bot created with Python that uses OpenAI's API to include ChatGPT features.",
    href: 'https://github.com/efatine/Discord-AI-Bot',
    icon: ['fab', 'discord'],
  },
  {
    title: 'GCC Cycling Android App',
    description: "GCC Cycling App - An Android app built using Java with a working SQL database",
    href: 'https://github.com/efatine/GCC-Cycling-App',
    icon: ['fas', 'bicycle']
  },
  {
    title: 'eHotels: Hotel Management System',
    description: "A hotel management system app, built on React and MySQL",
    href: 'https://github.com/efatine/eHotels',
    icon: ['fas', 'hotel']
  }
]
