import { useState } from "react"
import { ScrollProvider, useScroll } from "./context/ScrollContext"
import { SpaceScene } from "./components/space/SpaceScene"
import { HeroSection } from "./sections/HeroSection"
import { AboutSection } from "./sections/AboutSection"
import { ExperienceSection } from "./sections/ExperienceSection"
import { ProjectsSection } from "./sections/ProjectsSection"
import { TechStackSection } from "./sections/TechStackSection"
import { ChatSection } from "./sections/ChatSection"
import { ContactSection } from "./sections/ContactSection"
import { ScrollProgressBar } from "./components/ScrollProgressBar"
import { CustomCursor } from "./components/ui/CustomCursor"
import { SideDotsNav } from "./components/navigation/SideDotsNav"
import { SpaceAudio } from "./components/audio/SpaceAudio"

function ScrollContent() {
  const { TOTAL_VH } = useScroll()

  return (
    <div style={{ height: `${TOTAL_VH * 100}vh`, position: "relative" }}>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <ChatSection />
      <ContactSection />
    </div>
  )
}

export default function App() {
  const [audioOn, setAudioOn] = useState(false)

  return (
    <ScrollProvider>

      {/* Cursor */}
      <CustomCursor />

      {/* Audio */}
      <SpaceAudio enabled={audioOn} />

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SpaceScene />
      </div>

      {/* UI Layer */}
      <div className="relative z-10">
        <ScrollProgressBar />
        <SideDotsNav />   {/* 👈 TARO DI SINI */}
        <ScrollContent />
      </div>

    </ScrollProvider>
  )
}