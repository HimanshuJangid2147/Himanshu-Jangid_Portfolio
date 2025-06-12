import './App.css'
import Navbar from "./Components/Navbar.jsx";
import HeroSection from "./Pages/HeroSection.jsx";
import AboutSection from "./Pages/AboutSection.jsx";
import GlobalBackground from "./Components/GlobalBackground.jsx";
import SkillsSection from "./Pages/SkillsSection.jsx";
import ProjectsSection from "./Pages/ProjectsSection.jsx";

function App() {
  return (
    <>
        <GlobalBackground>
            <Navbar />
            <div>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                {/*<ContactSection />*/}
            </div>
        </GlobalBackground>
    </>
  )
}

export default App
