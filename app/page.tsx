import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Playground from "@/components/Playground";
import LiveWidgets from "@/components/LiveWidgets";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import EasterEggs from "@/components/EasterEggs";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ScrollProgress />
      <CursorGlow />
      <BackgroundBlobs />
      <EasterEggs />
      <Navbar />
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Playground />
      <LiveWidgets />
      <Contact />
      <Footer />
    </main>
  );
}
