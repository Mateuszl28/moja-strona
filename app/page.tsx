import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Playground from "@/components/Playground";
import LiveWidgets from "@/components/LiveWidgets";
import MobileApp from "@/components/MobileApp";
import FAQ from "@/components/FAQ";
import HireMe from "@/components/HireMe";
import Contact from "@/components/Contact";
import Guestbook from "@/components/Guestbook";
import TipJar from "@/components/TipJar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import EasterEggs from "@/components/EasterEggs";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import TechMarquee from "@/components/TechMarquee";
import { getVerifiedMessages } from "@/lib/guestbook";

export default function Home() {
  const guestbookMessages = getVerifiedMessages();

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
      <MobileApp />
      <FAQ />
      <HireMe />
      <Contact />
      <Guestbook messages={guestbookMessages} />
      <TipJar />
      <Newsletter />
      <Footer />
    </main>
  );
}
