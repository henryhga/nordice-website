import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Origin } from "@/sections/Origin";
import { Product } from "@/sections/Product";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Origin />
        <Product />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
