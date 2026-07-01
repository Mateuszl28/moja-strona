import Landing from "@/components/Landing";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Landing />
      <Services />
      <About />
      <Process />
      <CTA />
    </main>
  );
}
