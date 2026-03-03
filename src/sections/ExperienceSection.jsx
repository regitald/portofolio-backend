import { useScroll, SECTION_HEIGHTS } from "../context/ScrollContext"

const experiences = [
  {
    year: "Feb 2023 – Present",
    title: "Senior Backend Engineer — PT Antikode Desain Eksperiensia",
    tech: "Laravel • Node.js • REST API • MySQL • PostgreSQL • Meilisearch • OpenAI API • Microservices",
    desc: [
      "Architect and develop scalable RESTful APIs for insurance, hospital management (booking, queue, transactions), telecommunications, and enterprise platforms.",
      "Design relational database schemas (MySQL & PostgreSQL) including complex N:N relationships and high-traffic query optimization.",
      "Implement payment gateways, email services, background jobs, and third-party API integrations with strong transactional reliability.",
      "Build internal CMS automation tooling using Node.js with OpenAI integration and optimize search using Meilisearch.",
      "Collaborate with frontend and product teams to translate business requirements into production-ready backend systems."
    ],
  },
  {
    year: "Aug 2021 – Feb 2023",
    title: "Backend Engineer — PT Paninti Duta Internusa",
    tech: "Laravel • Golang • REST API • Microservices • API Gateway Concept • MySQL",
    desc: [
      "Develop microservices-oriented backend systems for marketplace and product review platform.",
      "Design and implement REST APIs using Laravel and Golang with scalable service-to-service communication.",
      "Define backend architecture and integration guidelines aligned with API Gateway concepts.",
      "Act as liaison between product owners and engineering teams, managing backlog prioritization and technical documentation."
    ],
  },
  {
    year: "Apr 2021 – Jul 2021",
    title: "Lead Backend Developer — PT Rapier Technology International",
    tech: "Lumen • REST API • Microservices • External API Integration • Team Leadership",
    desc: [
      "Design and implement REST APIs for progressive web and mobile applications in high-transaction environments.",
      "Integrate third-party services and external APIs while standardizing API response and validation structures.",
      "Manage and mentor a team of 5 engineers and monitor sprint execution."
    ],
  },
  {
    year: "Jul 2021 – Aug 2021",
    title: "Backend Developer (Freelance) — DreamhouseLab",
    tech: "Laravel • MySQL • POS Systems • Query Optimization",
    desc: [
      "Maintain and enhance backend systems for a Point of Sale (POS) application.",
      "Optimize complex database queries and improve transactional stability."
    ],
  },
  {
    year: "Oct 2020 – Mar 2021",
    title: "Backend Developer — PT IDStar Cipta Teknologi",
    tech: "Laravel • MySQL • SQL Server • Service-Repository Pattern",
    desc: [
      "Develop internal HR systems including authentication and attendance tracking modules.",
      "Apply Service–Repository–Controller architecture for scalable backend design.",
      "Handle complex relational queries and optimize large dataset retrieval."
    ],
  },
  {
    year: "2018 – 2020",
    title: "Junior Backend Developer — PT Codelabs Indonesia",
    tech: "Laravel • Lumen • REST API • JWT • MySQL • CMS • Microservices",
    desc: [
      "Design and implement REST APIs for CMS, loyalty, voucher systems, and enterprise applications.",
      "Implement JWT authentication for API security and structured relational database design.",
      "Contribute to microservices-based backend architecture using PHP Lumen."
    ],
  },
]

export function ExperienceSection() {
  const { scrollProgress, getProgressFor } = useScroll()
  const { start, span } = getProgressFor("experience")

  const raw = (scrollProgress - start) / span
  const clamped = Math.min(1, Math.max(0, raw))
  const local = 1 - Math.pow(1 - clamped, 3)

  const offsetVH =
    SECTION_HEIGHTS.hero +
    SECTION_HEIGHTS.about +
    SECTION_HEIGHTS.roles

  return (
    <section
      className="absolute left-0 right-0 px-6"
      style={{
        top: `${offsetVH * 100}vh`,
        height: `${SECTION_HEIGHTS.experience * 100}vh`,
      }}
    >
      <div className="relative max-w-6xl mx-auto pt-40">

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.6) 40%, rgba(2,6,23,0.3) 65%, transparent 85%)",
            filter: "blur(30px)",
          }}
        />

        {/* Title */}
        <h2 className="text-5xl font-bold text-center text-white mb-24">
          My <span className="text-violet-400">Career & Experience</span>
        </h2>

        <div className="relative">

          {/* Base line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-violet-500/20 h-full" />

          {/* Growing line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-violet-400 origin-top"
            style={{
              height: "100%",
              transform: `scaleY(${local})`,
              boxShadow: "0 0 20px #8b5cf6",
              transition: "transform 0.1s linear",
            }}
          />

          {/* Moving dot */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `${local * 100}%`,
              transform: "translate(-50%, -50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#c4b5fd",
              boxShadow: "0 0 25px #a78bfa",
              transition: "top 0.1s linear",
            }}
          />

<div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 relative">
  {experiences.map((exp, i) => {
    const trigger = (i + 0.3) / experiences.length
    const visible = local >= trigger

    return (
      <div
        key={exp.year}
        className={`relative ${i % 2 === 0 ? "md:pr-12 md:text-left" : "md:pl-12 md:text-left"}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0)"
            : "translateY(40px)",
          transition: "all 0.6s ease",
        }}
      >
        <p className="text-indigo-400 text-sm font-mono">
          {exp.year}
        </p>

        <h3 className="text-white text-xl font-semibold mt-2">
          {exp.title}
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {exp.desc.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              • {item}
            </li>
          ))}
        </ul>

        <p className="text-xs text-violet-400 mt-4 font-mono">
          {exp.tech}
        </p>
      </div>
    )
  })}
</div>

        </div>
      </div>
    </section>
  )
}