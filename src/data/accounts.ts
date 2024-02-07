import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Account {
  name: string
  href?: string
  icon?: IconProp
  copyEmail: () => void
  downloadResume: () => void
}

// Fix: Provide the second type argument to Omit for exclusion
export const AccountData: Omit<Account, 'copyEmail' | 'downloadResume'>[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/efatine',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eliasfatine/',
  },
  {
    name: 'Resume',
    icon: ['fas', 'file']
  },
  {
    name: 'Email',
    icon: ['fas', 'envelope'],
  },
]
