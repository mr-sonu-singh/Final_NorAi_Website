import { routes } from './routes';
import { NavItem } from '@/types';

export const AUDENS_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Capabilities', href: routes.products },
  { label: 'Approach', href: `${routes.services}#operating-rituals` },
  { label: 'Deliverables', href: routes.services },
  { label: 'About', href: routes.team },
  { label: 'The Canonical', href: routes.blog },
];

export const mainNav = AUDENS_HEADER_NAV_ITEMS;

export const footerNav = {
  tools: [
    { title: 'Resume Shortlister', href: `${routes.products}/resume-shortlister` },
    { title: 'Course Note-Taker', href: `${routes.products}/course-note-taker` },
    { title: 'Chat Digest', href: `${routes.products}/chat-digest` },
    { title: 'Smart Dainik News', href: `${routes.products}/smart-dainik-news` },
  ],
  solutions: [
    { title: 'Custom Automations', href: routes.services },
    { title: 'Secure Infrastructure', href: routes.services },
    { title: 'Business Pipelines', href: routes.services },
  ],
  community: [
    { title: 'Free Student Workshops', href: '/mission' as const },
    { title: '75 Districts Mission', href: '/mission' as const },
    { title: 'Team Story', href: routes.team },
  ],
  legal: [
    { title: '100% Private Guarantee', href: routes.privacy },
    { title: 'Terms of Service', href: routes.terms },
    { title: 'Security Overview', href: routes.privacy },
  ],
} as const;
