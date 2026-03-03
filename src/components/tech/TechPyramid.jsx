import { useEffect, useState } from "react"
import { useScroll } from "../../context/ScrollContext"

export function TechPyramid() {
  const { section } = useScroll()
  const active = section === "tech"

  const icons = [
    { src: "/stack/laravel.png", label: "Laravel" },
    { src: "/stack/php.png", label: "PHP" },
    { src: "/stack/nodejs.svg", label: "Node.js" },
    { src: "/stack/vuejs.png", label: "VueJS" },
    { src: "/stack/expressjs.png", label: "Express" },
    { src: "/stack/reactjs.png", label: "ReactJS" },
    { src: "/stack/strapi.svg", label: "Strapi" },
    { src: "/stack/golang.png", label: "Go" },
    { src: "/stack/Bootstrap.svg", label: "Bootstrap" },
    { src: "/stack/css.png", label: "CSS" },
    { src: "/stack/html.png", label: "HTML" },
    { src: "/stack/graphql.png", label: "GraphQL" },
    { src: "/stack/restapi.png", label: "REST API" },
    { src: "/stack/MySQL.png", label: "MySQL" },
    { src: "/stack/sqlserver.png", label: "SQL Server" },
    { src: "/stack/Postgresql.svg", label: "PostgreSQL" },
    { src: "/stack/Mongodb.png", label: "MongoDB" },
    { src: "/stack/redis.png", label: "Redis" },
    { src: "/stack/melisearch.png", label: "Meilisearch" },
    { src: "/stack/gitlab.png", label: "GitLab" },
    { src: "/stack/github.png", label: "GitHub" },
  ]

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return
    }
    const timeout = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timeout)
  }, [active])

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        pointerEvents: active ? "auto" : "none",
        opacity: active ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <div
        style={{
          marginBottom: "70px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "42px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "1px",
            textShadow: "0 0 25px rgba(139,92,246,0.6)",
          }}
        >
          Tech Stack
        </div>

        <div
          style={{
            margin: "14px auto 0",
            width: "200px",
            height: "3px",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, transparent, #a855f7, #6366f1, transparent)",
            boxShadow: "0 0 20px rgba(139,92,246,0.7)",
          }}
        />
      </div>

      <div className="tech-grid">
        {icons.map((item, i) => (
          <div
            key={item.src}
            className="tech-item"
            style={{
              transform: visible ? "translateY(0)" : "translateY(20px)",
              opacity: visible ? 1 : 0,
              transition: `all 0.4s ease ${i * 0.03}s`,
            }}
          >
            <img src={item.src} alt={item.label} className="tech-icon" />
            <div className="tech-label">{item.label}</div>
          </div>
        ))}
      </div>

      <style>
        {`
          .tech-grid {
            display: flex;
            gap: 40px;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 1000px;
          }

          .tech-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: opacity 0.3s ease;
          }

          .tech-icon {
            height: 38px;
            margin-bottom: 8px;
            transition: all 0.3s ease;
            filter: drop-shadow(0 0 10px rgba(139,92,246,0.5));
          }

          .tech-label {
            font-size: 12px;
            color: rgb(196, 190, 221);
            transition: all 0.3s ease;
          }

          .tech-grid:hover .tech-item {
            opacity: 0.25;
          }

          .tech-grid:hover .tech-item:hover {
            opacity: 1;
          }

          .tech-grid:hover .tech-item:hover .tech-icon {
            transform: scale(1.25);
            filter:
              drop-shadow(0 0 12px rgba(255,255,255,0.9))
              drop-shadow(0 0 30px rgba(255,255,255,0.8))
              drop-shadow(0 0 60px rgba(255,255,255,0.7));
          }

          .tech-grid:hover .tech-item:hover .tech-label {
            color: white;
            text-shadow: 0 0 15px rgba(255,255,255,0.8);
          }
        `}
      </style>
    </div>
  )
}