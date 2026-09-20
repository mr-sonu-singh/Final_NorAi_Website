import { routes } from './routes';
import { NavItem } from '@/types';

export const NORAI_HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: routes.services },
  { label: 'Prototypes', href: routes.products },
  { label: 'Civic Mission', href: '/mission' },
  { label: 'Studio & Story', href: routes.team },
];

export const AUDENS_HEADER_NAV_ITEMS: NavItem[] = NORAI_HEADER_NAV_ITEMS;

export const mainNav = NORAI_HEADER_NAV_ITEMS;

export const footerNav = {
  tools: [
    { title: 'AI Resume Shortlister', href: `${routes.products}/resume-shortlister` },
    { title: 'Course Note-Taker', href: `${routes.products}/course-note-taker` },
    { title: 'Chat Digest', href: `${routes.products}/chat-digest` },
    { title: 'Smart Dainik News', href: `${routes.products}/smart-dainik-news` },
  ],
  solutions: [
    { title: 'AI Solutions & Agents', href: routes.services },
    { title: 'Custom Modern Web Software', href: routes.services },
    { title: 'Spatial Computing (AR / VR)', href: routes.services },
    { title: 'Research & Innovation', href: routes.services },
  ],
  community: [
    { title: 'Youth Upskilling Mission', href: '/mission' as const },
    { title: 'Student Upskilling Initiatives', href: '/mission' as const },
    { title: 'Ghazipur Studio & Team', href: routes.team },
  ],
  legal: [
    { title: 'Privacy Policy', href: routes.privacy },
    { title: 'Terms of Service', href: routes.terms },
  ],
} as const;
