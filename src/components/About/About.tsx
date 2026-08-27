import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./About.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      /*
       * =====================================================
       * PARALLAX PELO MOUSE
       * =====================================================
       */

      const backgroundX = gsap.quickTo(backgroundRef.current, "x", {
        duration: 1.2,
        ease: "power3.out",
      });

      const backgroundY = gsap.quickTo(backgroundRef.current, "y", {
        duration: 1.2,
        ease: "power3.out",
      });

      const photoX = gsap.quickTo(photoRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });

      const photoY = gsap.quickTo(photoRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const handleMouseMove = (event: MouseEvent) => {
        const rect = section.getBoundingClientRect();

        /*
         * Só aplicamos o efeito quando a seção
         * estiver próxima da viewport.
         */

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }

        const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;

        const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

        /*
         * Background se movimenta pouco.
         */

        backgroundX(mouseX * -14);
        backgroundY(mouseY * -8);

        /*
         * Foto se movimenta mais.
         */

        photoX(mouseX * 24);
        photoY(mouseY * 14);
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
        .from(".about-eyebrow", {
          opacity: 0,
          y: 30,
          duration: 0.7,
        })
        .from(
          ".about-title",
          {
            opacity: 0,
            y: 60,
            duration: 1,
          },
          "-=0.4",
        )
        .from(
          ".about-text",
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".about-info",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".about-photo-wrapper",
          {
            opacity: 0,
            x: 120,
            scale: 0.9,
            duration: 1.2,
          },
          "-=1",
        );

      /*
       * =====================================================
       * BACKGROUND — ZOOM CINEMATOGRÁFICO
       * =====================================================
       */

      gsap.fromTo(
        backgroundRef.current,
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
        },
      );

      /*
       * =====================================================
       * TEXTO — PEQUENO PARALLAX
       * =====================================================
       */

      gsap.fromTo(
        contentRef.current,
        {
          y: 40,
        },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

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
    },
  );

  return (
    <section ref={sectionRef} id="sobre" className="about">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="about-background">
        <img
          ref={backgroundRef}
          src="/images/about/sobremimi.png"
          alt=""
          className="about-background-image"
          aria-hidden="true"
        />

        <div className="about-background-overlay" />

        <div className="about-background-vignette" />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="about-container">
        <div ref={contentRef} className="about-content">
          <span className="about-eyebrow">01 — SOBRE MIM</span>

          <h2 className="about-title">
            Código,
            <br />
            <span>disciplina</span>
            <br />e criatividade.
          </h2>

          <div className="about-text">
            <p>
              Olá, eu sou <strong>José Mario</strong>.
            </p>

            <p>
              Desenvolvedor Full Stack movido por disciplina e código limpo,
              especializado em arquitetar e construir experiências digitais
              completas.
            </p>

            <p>
              Gosto de entender como as coisas funcionam, transformar ideias em
              projetos e sempre buscar uma maneira melhor de construir.
            </p>
          </div>

          {/* =================================================
              INFO
          ================================================= */}

          <div className="about-info">
            <div className="about-info-item">
              <span className="about-info-number">01</span>
              <div>
                <strong>Full Stack Architecture</strong>
                <p>
                  Desenvolvimento end-to-end com foco em escabilidade,
                  TypeScript e boas práticas.
                </p>
              </div>
            </div>

            <div className="about-info-item">
              <span className="about-info-number">02</span>
              <div>
                <strong>UI & Performance</strong>
                <p>
                  Interfaces reativas, experiência do usuário fluida e
                  otimização de recursos.
                </p>
              </div>
            </div>
            <div className="about-info-item">
              <span className="about-info-number">03</span>
              <div>
                <strong>Engenharia & Qualidade</strong>
                <p>
                  Arquitetura limpa, código manutenível e resolução estruturada
                  de problemas.
                </p>
              </div>
            </div>

            <div className="about-info-item">
              <span className="about-info-number">04</span>
              <div>
                <strong>Evolução Contínua</strong>
                <p>
                  Investimento constante em novas tecnologias, sistemas e IA
                  aplicada ao dev.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            PHOTO
        ================================================= */}

        <div className="about-photo-area">
          <div className="about-photo-glow" />

          <div className="about-photo-wrapper">
            <img
              ref={photoRef}
              src="/images/about/PerfilTerno.png"
              alt="José Mario"
              className="about-photo"
            />

            <div className="about-photo-gradient" />

            <div className="about-photo-label">
              <span>FULL STACK</span>
              <strong>DEVELOPER</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          DECORATION
      =================================================== */}

      <div className="about-decoration">
        <span />
        <span />
        <span />
      </div>

      <div className="about-scroll-hint">
        <span>SCROLL TO EXPLORE</span>

        <div />
      </div>
    </section>
  );
}
