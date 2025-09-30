import { Hero } from "@/components/Hero";
import { RoastShowcase } from "@/components/RoastShowcase";
import { Process } from "@/components/Process";
import { Impact } from "@/components/Impact";
import { Testimonials } from "@/components/Testimonials";
import { Locations } from "@/components/Locations";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RoastShowcase />
      <Process />
      <Impact />
      <Testimonials />
      <Locations />
      <Newsletter />
    </>
  );
}
