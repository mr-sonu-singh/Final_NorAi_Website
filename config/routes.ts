export const routes = {
  home: '/',
  products: '/products',
  productDetail: (slug: string) => `/products/${slug}`,
  services: '/services',
  about: '/about',
  team: '/team',
  careers: '/careers',
  contact: '/contact',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  privacy: '/privacy',
  terms: '/terms',
} as const;
