import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import EasterEggs from "@/components/EasterEggs";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />
      <EasterEggs />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubStats />
      <Contact />
      <Footer />
    </main>
  );
}
