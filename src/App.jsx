import './App.css'
import Navbar from "./Components/Navbar.jsx";
import HeroSection from "./Pages/HeroSection.jsx";
import AboutSection from "./Pages/AboutSection.jsx";
import GlobalBackground from "./Components/GlobalBackground.jsx";
import SkillsSection from "./Pages/SkillsSection.jsx";
import ProjectsSection from "./Pages/ProjectsSection.jsx";
import ServicesSection from "./Pages/ServicesSection.jsx";
import ContactSection from "./Pages/ContactSection.jsx";
import ExperienceSection from "./Pages/ExperienceSection.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
  return (
    <>
        <GlobalBackground>
            <Navbar />
            <div>
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <SkillsSection />
                <ProjectsSection />
                 <ExperienceSection />
                <ContactSection />
            </div>
            <Footer />
        </GlobalBackground>
    </>
  )
}

export default App
