import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/home/hero"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { AboutSection } from "@/components/home/about-section"
import { ContactSection } from "@/components/home/contact-section"
import { getAllProjects, getFeaturedProjects } from "@/lib/data/projects"

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4)
  const allProjects = getAllProjects()

  return (
    <>
      <Navbar />
      <main>
        <Hero latestProject={featuredProjects[0] ?? allProjects[0]} />
        <FeaturedProjects projects={featuredProjects} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
