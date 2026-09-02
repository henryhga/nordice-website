import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Product } from "@/sections/Product";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Product />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
