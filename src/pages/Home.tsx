import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { ServiceMap } from '../components/ServiceMap';

export function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <ServiceMap />
    </main>
  );
}
