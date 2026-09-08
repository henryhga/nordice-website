import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Essence } from "@/sections/Essence";
import { Process } from "@/sections/Process";
import { Experience } from "@/sections/Experience";
import { Product } from "@/sections/Product";
import { RequestModalProvider } from "@/components/modal/RequestModalContext";

export default function Home() {
  return (
    <RequestModalProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <Essence />
        <Process />
        <Experience />
        <Product />
      </main>
      <Footer />
    </RequestModalProvider>
  );
}
