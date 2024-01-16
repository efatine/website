import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Project {
  title: string
  description: string
  href?: string
  icon: IconProp
}

export const ProjectData: Project[] = [
  {
    title: 'Discord Bot Integrated with ChatGPT',
    description: "A simple bot made with Python using OpenAI's API to integrate ChatGPT functionality within it",
    href: 'https://github.com/efatine/Discord-AI-Bot',
    icon: ['fab', 'discord'],
  },
  {
    title: 'Personal Website',
    description:
      "The website that you're currently on! Made with Next.js and utilises serverless functions.",
    href: 'https://github.com/efatine/website',
    icon: ['fas', 'globe-americas'],
  },
]
