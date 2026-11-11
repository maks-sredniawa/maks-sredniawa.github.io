/** Must match the MaksForge Studio Google Business Profile exactly; Google pairs the listing with the number on its website. */
export const studio = {
  name: 'MaksForge Studio',
  telephone: '+48720855945',
  telephoneDisplay: '+48 720 855 945',
  email: 'studio@maksforge.com',
  vcard: '/assets/maks-forge-studio.vcf',
} as const;

export const studioStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: studio.name,
  url: 'https://maksforge.com/',
  telephone: studio.telephone,
  email: studio.email,
  areaServed: { '@type': 'Country', name: 'Poland' },
} as const;
