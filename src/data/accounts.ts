import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Account {
  name: string
  href?: string
  icon?: IconProp
  copyEmail: () => void
}

export const AccountData: Omit<Account, 'copyEmail'>[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/efatine',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eliasfatine/',
  },
 /* {
    name: 'Discord',
    href: '/discord',
  },*/
  {
    name: 'Email',
    icon: ['fas', 'envelope'],
  },
]
