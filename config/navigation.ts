import { routes } from './routes';

export const mainNav = [
  { title: 'Products', href: routes.products },
  { title: 'Services', href: routes.services },
  { title: 'About', href: routes.about },
  { title: 'Team', href: routes.team },
  { title: 'Blog', href: routes.blog },
  { title: 'Contact', href: routes.contact },
] as const;

export const footerNav = {
  products: [
    { title: 'All Products', href: routes.products },
    { title: 'Resume Shortlister', href: `${routes.products}/resume-shortlister` },
    { title: 'Course Note-Taker', href: `${routes.products}/course-note-taker` },
    { title: 'Chat Digest AI', href: `${routes.products}/chat-digest` },
    { title: 'Smart News AI', href: `${routes.products}/news-aggregator` },
  ],
  services: [{ title: 'Enterprise Services', href: routes.services }],
  company: [
    { title: 'About Us', href: routes.about },
    { title: 'Team', href: routes.team },
    { title: 'Careers', href: routes.careers },
    { title: 'Contact', href: routes.contact },
  ],
  resources: [{ title: 'Blog', href: routes.blog }],
  legal: [
    { title: 'Privacy Policy', href: routes.privacy },
    { title: 'Terms of Service', href: routes.terms },
  ],
} as const;
