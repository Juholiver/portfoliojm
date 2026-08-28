import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./Projects.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
  linkLabel: string;
  icon: string;
}

const projects: Project[] = [
  {
    title: "WinterForge",
    description:
      "Sistema completo para gerenciamento de academia, com autenticação de usuários, exercícios e criação de fichas de treino personalizadas.",
    technologies:
      "React, TypeScript, Vite, C#, .NET 10, PostgreSQL, JWT",
    link: "https://winterforge-rho.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "🐺",
  },
  {
    title: "São Francisco Personalizados",
    description:
      "Loja online de produtos personalizados com foco em uma experiência moderna e intuitiva.",
    technologies: "Next.js, TypeScript, MongoDB, JWT",
    link: "https://sfp-nine.vercel.app/login",
    linkLabel: "Ver Projeto",
    icon: "🎁",
  },
  {
    title: "ProVet Itape SaaS",
    description:
      "SaaS para gestão de clínicas veterinárias com dashboard completo.",
    technologies: "Next.js, TypeScript, Tailwind CSS, Supabase",
    link: "https://provet-itape.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "🐶",
  },
  {
    title: "Hamburgueria Express",
    description:
      "E-commerce para pedidos rápidos com gerenciamento de estado no carrinho.",
    technologies: "React, JavaScript, CSS",
    link: "https://express-hamburgueria.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "🍔",
  },
  {
    title: "Analisador de Códigos com IA",
    description:
      "Ferramenta que utiliza inteligência artificial para fornecer feedback sobre código.",
    technologies: "React, Vite, Gemini API",
    link: "https://analisador-de-codigo-com-ia-nine.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "🖥️",
  },
  {
    title: "Previsão do Tempo",
    description:
      "Aplicação de consumo de API climática com interface responsiva.",
    technologies: "React, Vite, Weather API",
    link: "https://previsao-react.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "🌤️",
  },
  {
    title: "MyTranslator",
    description:
      "Tradutor multilíngue com suporte a reconhecimento de voz.",
    technologies: "JavaScript, MyMemory API",
    link: "https://juholiver.github.io/MyTranslator/",
    linkLabel: "Ver Projeto",
    icon: "🌐",
  },
  {
    title: "Kanban com React",
    description:
      "Gerenciador de tarefas com interação de arrastar e soltar para organização do fluxo.",
    technologies: "React, JavaScript, CSS",
    link: "https://kanban-react-eight-opal.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "📔",
  },
  {
    title: "Cardápio Digital",
    description:
      "Sistema dinâmico para visualização de menus em restaurantes.",
    technologies: "React, Vite, CSS Modules",
    link: "https://cardapio-react-kappa.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "👨‍🍳",
  },
  {
    title: "Fundo Mágico",
    description:
      "Sistema para criação de backgrounds personalizados utilizando automação e inteligência artificial.",
    technologies: "JavaScript, n8n",
    link: "https://juholiver.github.io/fundomagico/",
    linkLabel: "Ver Projeto",
    icon: "🎨",
  },
  {
    title: "Academia IA — Solo Leveling",
    description:
      "Gerador de treinos temáticos utilizando inteligência artificial.",
    technologies: "React, OpenAI API",
    link: "https://academia-sololeving-ia.vercel.app/",
    linkLabel: "Ver Projeto",
    icon: "💪",
  },
];

const backendProjects: Project[] = [
  {
    title: "API de Autenticação",
    description:
      "Backend para gerenciamento de usuários e autenticação utilizando JWT.",
    technologies: "Node.js, MongoDB Atlas",
    link: "https://github.com/Juholiver/appLoginNodeJs",
    linkLabel: "Ver Código",
    icon: "💾",
  },
  {
    title: "ApiExercicios",
    description:
      "API REST para gerenciamento de exercícios físicos, permitindo consultar e organizar exercícios por grupo muscular e nível.",
    technologies:
      "C#, .NET 10, PostgreSQL, Entity Framework Core",
    link: "https://github.com/Juholiver/ApiAcademia",
    linkLabel: "Ver Código",
    icon: "💾",
  },
  {
    title: "ApiAuthAcademia",
    description:
      "API de autenticação e gerenciamento de treinos para a aplicação WinterForge, com segurança baseada em JWT.",
    technologies:
      "C#, .NET 10, PostgreSQL, Entity Framework Core, JWT",
    link: "https://github.com/Juholiver/ApiAuthAcademia",
    linkLabel: "Ver Código",
    icon: "💾",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="project-icon">{project.icon}</span>
      </div>

      <div className="project-card-content">
        <h3>{project.title}</h3>

        <p className="project-description">{project.description}</p>

        <p className="project-technologies">
          <span>Tecnologias</span>
          {project.technologies}
        </p>

        <a
          className="project-link"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.linkLabel}
          <span className="project-arrow">↗</span>
        </a>
      </div>
    </article>
  );
}

export function Projects() {
  const projectsRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = projectsRef.current;
      if (!section) return;

      const backgroundImage = section.querySelector<HTMLElement>(
        ".projects-background-image"
      );

      /*
       * =====================================================
       * PARALLAX PELO MOUSE
       * =====================================================
       */
      const backgroundX = gsap.quickTo(backgroundImage, "x", {
        duration: 1.2,
        ease: "power3.out",
      });

      const backgroundY = gsap.quickTo(backgroundImage, "y", {
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

        // Executa apenas quando a seção estiver visível na viewport
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }

        const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

        // Movimento suave do fundo e do conteúdo principal
        backgroundX(mouseX * -14);
        backgroundY(mouseY * -8);

        containerX(mouseX * 12);
        containerY(mouseY * 8);
      };

      window.addEventListener("mousemove", handleMouseMove);

      /*
       * =====================================================
       * ANIMAÇÃO DE ENTRADA
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
        .from(".projects-eyebrow", {
          opacity: 0,
          y: 30,
          duration: 0.7,
        })
        .from(
          ".projects-title",
          {
            opacity: 0,
            y: 60,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".projects-introduction",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".projects-category",
          {
            opacity: 0,
            y: 50,
            stagger: 0.3,
            duration: 0.9,
          },
          "-=0.4"
        )
        .from(
          ".project-card",
          {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.6"
        );

      /*
       * =====================================================
       * BACKGROUND — ZOOM CINEMATOGRÁFICO NO SCROLL
       * =====================================================
       */
      if (backgroundImage) {
        gsap.fromTo(
          backgroundImage,
          {
            scale: 1.05,
          },
          {
            scale: 1.16,
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
      scope: projectsRef,
    }
  );

  return (
    <section
      ref={projectsRef}
      id="projetos"
      className="projects-section"
    >
      <div className="projects-background">
        <img
          src="/images/projetos/escritorio.png"
          alt=""
          className="projects-background-image"
        />

        <div className="projects-background-overlay" />

        <div className="projects-background-vignette" />
      </div>

      <div className="projects-container" ref={containerRef}>
        <header className="projects-header">
          <span className="projects-eyebrow">02 — PROJETOS</span>

          <h2 className="projects-title">
            O que eu <span> construí.</span>
          </h2>

          <p className="projects-introduction">
            Uma seleção dos projetos que representam minha evolução como
            desenvolvedor, desde aplicações front-end até sistemas completos
            com backend, banco de dados e autenticação.
          </p>
        </header>

        <div className="projects-category">
          <div className="projects-category-header">
            <span>01</span>

            <div>
              <p>DESENVOLVIMENTO</p>
              <h3>Front-End</h3>
            </div>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="projects-category backend-category">
          <div className="projects-category-header">
            <span>02</span>

            <div>
              <p>ARQUITETURA</p>
              <h3>Back-End</h3>
            </div>
          </div>

          <div className="projects-grid backend-grid">
            {backendProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}