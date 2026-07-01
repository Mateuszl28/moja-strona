import Landing from "@/components/Landing";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Process from "@/components/Process";
import WhyMe from "@/components/WhyMe";
import Testimonials from "@/components/Testimonials";
import BlogTeaser from "@/components/BlogTeaser";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Landing />
      <Services />
      <FeaturedProjects />
      <Stats />
      <About />
      <Process />
      <WhyMe />
      <Testimonials />
      <BlogTeaser />
      <CTA />
    </main>
  );
}
