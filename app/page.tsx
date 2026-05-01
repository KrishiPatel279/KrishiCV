import { Starfield } from "@/components/site/starfield"
import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { Profile } from "@/components/site/profile"
import { Education } from "@/components/site/education"
import { Experience } from "@/components/site/experience"
import { Skills } from "@/components/site/skills"
import { Play } from "@/components/site/play"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main className="relative">
        <Hero />
        <Profile />
        <Education />
        <Experience />
        <Skills />
        <Play />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
