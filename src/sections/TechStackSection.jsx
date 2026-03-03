import { SECTION_HEIGHTS } from "../context/ScrollContext"
import { TechPyramid } from "../components/tech/TechPyramid"

export function TechStackSection() {
  return (
    <section
      className="absolute left-0 right-0"
      style={{
        top: `${
          (SECTION_HEIGHTS.hero +
            SECTION_HEIGHTS.about +
            SECTION_HEIGHTS.roles +
            SECTION_HEIGHTS.experience +
            SECTION_HEIGHTS.projects) * 100
        }vh`,
        height: `${SECTION_HEIGHTS.tech * 100}vh`,
      }}
    >
      <TechPyramid />
    </section>
  )
}