export const lat = 49.859388;
export const lng = 24.017337;

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Master Relax — масаж у Львові',
  url: 'https://master-relax.com.ua',
  image: 'https://master-relax.com.ua/images/hero.webp',
  telephone: '+380965181114',
  priceRange: '₴₴',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Львів',
    addressCountry: 'UA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
  areaServed: 'Львів',
  sameAs: [
    'https://www.instagram.com/_master_relax/',
    'https://t.me/Ihormasterrelax',
    'https://www.facebook.com/profile.php?id=100065115205716',
  ],
};
