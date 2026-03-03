import { useScroll } from "../context/ScrollContext"

export function ProjectSection() {
  const { scrollProgress, getProgressFor } = useScroll()
  const { start, end } = getProgressFor("projects")

  const local =
    scrollProgress < start
      ? 0
      : scrollProgress > end
      ? 1
      : (scrollProgress - start) / (end - start)

  const translateX = -local * 200 // geser 200vw

  return (
    <section
      className="absolute left-0 right-0 overflow-hidden"
      style={{ top: "600vh", height: "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        <div
          className="flex h-full items-center"
          style={{
            width: "300vw",
            transform: `translateX(${translateX}vw)`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="w-screen flex justify-center items-center text-white text-4xl">
            Project 1
          </div>
          <div className="w-screen flex justify-center items-center text-white text-4xl">
            Project 2
          </div>
          <div className="w-screen flex justify-center items-center text-white text-4xl">
            Project 3
          </div>
        </div>

      </div>
    </section>
  )
}