import { AboutUs } from '@/components/shared/about-us';
import { ContactUs } from '@/components/shared/contact/contact-us';
import { Container } from '@/components/shared/container';
import { Hero } from '@/components/shared/hero';
import { Inventory } from '@/components/shared/inventory';
import { Location } from '@/components/shared/location';
import { PhotoCarousel } from '@/components/shared/photo-carousel';
import { Testemonials } from '@/components/shared/testemonials';
import { Video } from '@/components/shared/video';

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Video />
        <AboutUs />
        <Inventory />
        <PhotoCarousel />
        <Location />
        <Testemonials />
        <ContactUs />
      </Container>
    </main>
  );
}
