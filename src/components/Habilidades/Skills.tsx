import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./Skills.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Skill {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const skills: Skill[] = [
  {
    number: "01",
    title: "Front-End",
    description:
      "HTML, CSS, JavaScript, TypeScript, Angular, React e Next.js.",
    icon: "⌘",
  },
  {
    number: "02",
    title: "Back-End",
    description:
      "Node.js, Python, C# e .NET para criação de APIs e aplicações.",
    icon: "⚙",
  },
  {
    number: "03",
    title: "Design",
    description:
      "UI/UX, prototipação e criação de interfaces utilizando Figma.",
    icon: "◈",
  },
  {
    number: "04",
    title: "Ferramentas",
    description:
      "Git, VS Code, n8n, JWT, Cookies, IA e OpenCode.",
    icon: "◇",
  },
  {
    number: "05",
    title: "Banco de Dados",
    description:
      "MySQL, MongoDB, Supabase e PostgreSQL.",
    icon: "◉",
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const background = section.querySelector<HTMLElement>(
        ".skills-background-image"
      );

      /*
       * =====================================================
       * PARALLAX PELO MOUSE
       * =====================================================
       */
      const backgroundX = gsap.quickTo(background, "x", {
        duration: 1.2,
        ease: "power3.out",
      });

      const backgroundY = gsap.quickTo(background, "y", {
        duration: 1.2,
        ease: "power3.out",
      });

      const containerX = gsap.quickTo(containerRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });

      const containerY = gsap.quickTo(containerRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const handleMouseMove = (event: MouseEvent) => {
        const rect = section.getBoundingClientRect();

        /*
         * Só aplica o efeito enquanto a seção estiver visível.
         */
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }

        const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

        backgroundX(mouseX * -14);
        backgroundY(mouseY * -8);

        containerX(mouseX * 12);
        containerY(mouseY * 8);
      };

      window.addEventListener("mousemove", handleMouseMove);

      /*
       * =====================================================
       * ANIMAÇÃO DE ENTRADA (INTRO)
       * =====================================================
       */
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 35%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".skills-eyebrow", {
          opacity: 0,
          y: 30,
          duration: 0.7,
        })
        .from(
          ".skills-title",
          {
            opacity: 0,
            y: 60,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".skills-introduction",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".skills-category-header",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".skill-card",
          {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".formation-section",
          {
            opacity: 0,
            y: 50,
            duration: 0.9,
          },
          "-=0.3"
        );

      /*
       * =====================================================
       * BACKGROUND — ZOOM E PARALLAX NO SCROLL
       * =====================================================
       */
      if (background) {
        gsap.fromTo(
          background,
          {
            scale: 1.05,
            yPercent: -5,
          },
          {
            scale: 1.16,
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      /*
       * =====================================================
       * CLEANUP
       * =====================================================
       */
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      id="habilidades"
      className="skills-section"
      ref={sectionRef}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="skills-background">
        <img
          src="/images/habilidades/habilidades.jpg"
          alt=""
          className="skills-background-image"
        />
        <div className="skills-background-overlay" />
        <div className="skills-background-vignette" />
      </div>

      {/* =====================================================
          CONTEÚDO
      ====================================================== */}
      <div className="skills-container" ref={containerRef}>
        {/* ===================================================
            HEADER
        ==================================================== */}
        <header className="skills-header">
          <span className="skills-eyebrow">
            03 — HABILIDADES
          </span>

          <h2 className="skills-title">
            O que eu <span> domino.</span>
          </h2>

          <p className="skills-introduction">
            Tecnologias, ferramentas e conhecimentos que utilizo
            para transformar ideias em aplicações modernas,
            funcionais e bem estruturadas.
          </p>
        </header>

        {/* ===================================================
            HABILIDADES
        ==================================================== */}
        <div className="skills-category">
          <div className="skills-category-header">
            <span>01</span>

            <div>
              <p>CONHECIMENTO</p>
              <h3>Stack &amp; Skills</h3>
            </div>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <article
                className="skill-card"
                key={skill.title}
              >
                <div className="skill-card-top">
                  <span className="skill-number">
                    {skill.number}
                  </span>

                  <span className="skill-icon">
                    {skill.icon}
                  </span>
                </div>

                <div className="skill-card-content">
                  <h3>{skill.title}</h3>

                  <p>{skill.description}</p>
                </div>

                <div className="skill-card-line" />
              </article>
            ))}
          </div>
        </div>

        {/* ===================================================
            FORMAÇÃO
        ==================================================== */}
        <section className="formation-section">
          <div className="formation-header">
            <span>02</span>

            <div>
              <p>FORMAÇÃO ACADÊMICA</p>
              <h3>Minha formação.</h3>
            </div>
          </div>

          <div className="formation-layout">
            <div className="formation-content">
              <span className="formation-label">
                TECNÓLOGO
              </span>

              <h3>
                Análise e Desenvolvimento
                <span> de Sistemas.</span>
              </h3>

              <p>
                Formação voltada para desenvolvimento de
                software, análise de sistemas, banco de dados,
                engenharia de software e construção de soluções
                tecnológicas.
              </p>

              <div className="formation-details">
                <div>
                  <span>FORMAÇÃO</span>
                  <strong>
                    Análise e Desenvolvimento de Sistemas
                  </strong>
                </div>

                <div>
                  <span>ÁREA</span>
                  <strong>
                    Tecnologia da Informação
                  </strong>
                </div>
              </div>
            </div>

            <div className="diploma-area">
              <div className="diploma-glow" />

              <div className="diploma-frame">
                <div className="diploma-frame-inner">
                  <img
                    src="/images/formacao/diploma.jpg"
                    alt="Diploma de Análise e Desenvolvimento de Sistemas"
                    className="diploma-image"
                  />
                  <div className="diploma-overlay" />
                </div>
              </div>

              <span className="diploma-caption">
                CERTIFICAÇÃO ACADÊMICA
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          SCROLL HINT
      ====================================================== */}
      <div className="skills-scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div />
      </div>
    </section>
  );
}