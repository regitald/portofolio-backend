import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef()

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX
      const y = e.clientY

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "55px",
        height: "55px",
        borderRadius: "50%",
        background: "rgba(139,92,246,0.9)",
        boxShadow: `
          0 0 10px rgba(139,92,246,0.9),
          0 0 25px rgba(139,92,246,0.8),
          0 0 60px rgba(139,92,246,0.6)
        `,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.08s ease-out",
      }}
    />
  )
}