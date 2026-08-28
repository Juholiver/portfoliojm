import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import "./ParallaxHero.css";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  useGSAP
);

interface ParallaxLayer {
  selector: string;
  mouseX: number;
  mouseY: number;
  scrollY: number;
  scale?: number;
  rotation?: number;
}

export function ParallaxHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) {
        return;
      }

      /*
       * =====================================================
       * CONFIGURAÇÃO DO PARALLAX
       * =====================================================
       *
       * Quanto mais perto da câmera:
       *
       * - maior mouseX
       * - maior mouseY
       * - maior scrollY
       * - maior scale
       *
       * Isso cria a sensação de profundidade 2.5D.
       */

      const layers: ParallaxLayer[] = [
        {
          selector: ".layer-sky",
          mouseX: 3,
          mouseY: 1.5,
          scrollY: 8,
          scale: 1.01,
        },

        {
          selector: ".layer-city",
          mouseX: 7,
          mouseY: 3,
          scrollY: 18,
          scale: 1.02,
        },

        {
          selector: ".layer-environment",
          mouseX: 13,
          mouseY: 6,
          scrollY: 32,
          scale: 1.04,
        },

        {
          selector: ".layer-foreground",
          mouseX: 28,
          mouseY: 15,
          scrollY: 55,
          scale: 1.08,
          rotation: 0.6,
        },
      ];

      /*
       * =====================================================
       * CONFIGURAÇÃO INICIAL
       * =====================================================
       */

      layers.forEach(
        ({
          selector,
          scale = 1,
        }) => {
          gsap.set(selector, {
            xPercent: -50,
            yPercent: -50,

            left: "50%",
            top: "50%",

            scale,
          });
        }
      );

      /*
       * =====================================================
       * PARALLAX DO MOUSE
       * =====================================================
       */

      const mouseAnimations = layers.map(
        ({
          selector,
          mouseX,
          mouseY,
          rotation = 0,
        }) => {
          const x = gsap.quickTo(
            selector,
            "x",
            {
              duration: 1.4,
              ease: "power3.out",
            }
          );

          const y = gsap.quickTo(
            selector,
            "y",
            {
              duration: 1.4,
              ease: "power3.out",
            }
          );

          const rotate = gsap.quickTo(
            selector,
            "rotation",
            {
              duration: 1.8,
              ease: "power3.out",
            }
          );

          return {
            x,
            y,
            rotate,
            mouseX,
            mouseY,
            rotation,
          };
        }
      );

      /*
       * =====================================================
       * MOVIMENTO DO MOUSE
       * =====================================================
       */

      const handleMouseMove = (
        event: MouseEvent
      ) => {
        /*
         * Não executar parallax de mouse
         * em dispositivos pequenos.
         */

        if (window.innerWidth <= 768) {
          return;
        }

        /*
         * Transformamos a posição do mouse
         * em um valor entre aproximadamente:
         *
         * -1 -------- 0 -------- +1
         */

        const mouseX =
          (event.clientX /
            window.innerWidth -
            0.5) *
          2;

        const mouseY =
          (event.clientY /
            window.innerHeight -
            0.5) *
          2;

        mouseAnimations.forEach(
          ({
            x,
            y,
            rotate,
            mouseX: strengthX,
            mouseY: strengthY,
            rotation,
          }) => {
            x(
              mouseX *
                strengthX
            );

            y(
              mouseY *
                strengthY
            );

            /*
             * Rotação extremamente pequena.
             *
             * Isso ajuda a criar sensação
             * de câmera 2.5D.
             */

            rotate(
              mouseX *
                rotation
            );
          }
        );
      };

      window.addEventListener(
        "mousemove",
        handleMouseMove
      );

      /*
       * =====================================================
       * PARALLAX DURANTE O SCROLL
       * =====================================================
       *
       * Cada camada possui uma velocidade diferente.
       *
       * O foreground é o que mais se movimenta.
       */

      layers.forEach(
        ({
          selector,
          scrollY,
        }) => {
          gsap.to(selector, {
            yPercent:
              -50 -
              scrollY,

            ease: "none",

            scrollTrigger: {
              trigger:
                heroRef.current,

              start:
                "top top",

              end:
                "bottom top",

              scrub: 1,
            },
          });
        }
      );

      /*
       * =====================================================
       * MOVIMENTO EXTRA DA FOREGROUND
       * =====================================================
       *
       * O personagem e a mesa são os elementos
       * mais próximos da câmera.
       *
       * Durante o scroll eles crescem levemente.
       */

      gsap.to(
        ".layer-foreground",
        {
          scale: 1.14,

          ease: "none",

          scrollTrigger: {
            trigger:
              heroRef.current,

            start:
              "top top",

            end:
              "bottom top",

            scrub: 1,
          },
        }
      );

      /*
       * =====================================================
       * INTRO
       * =====================================================
       */

      const intro =
        gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

      intro

        .from(
          ".hero-badge",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          }
        )

        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 60,
            duration: 1,
          },
          "-=0.4"
        )

        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.5"
        )

        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        );

      /*
       * =====================================================
       * HERO FADE / SCALE
       * =====================================================
       */

      gsap.to(
        ".hero-inner",
        {
          scale: 0.92,
          opacity: 0.3,

          ease: "none",

          scrollTrigger: {
            trigger:
              heroRef.current,

            start:
              "top top",

            end:
              "bottom top",

            scrub: 1,
          },
        }
      );

      /*
       * =====================================================
       * CLEANUP
       * =====================================================
       */

      return () => {
        window.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    },
    {
      scope: heroRef,
    }
  );

  /*
   * =======================================================
   * NAVEGAÇÃO COM SCROLLSMOOTHER
   * =======================================================
   */

  const scrollToSection = (
    id: string
  ) => {
    const smoother =
      ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(
        `#${id}`,
        true
      );

      return;
    }

    const section =
      document.getElementById(id);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main
      ref={heroRef}
      className="hero"
    >
      <div className="hero-inner">

        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="hero-background">

          {/* =================================================
              SKY
          ================================================= */}

          <img
            src="/images/parallax/01-sky1.png"
            alt=""
            className="
              parallax-layer
              layer-sky
            "
            aria-hidden="true"
          />

          {/* =================================================
              CITY
          ================================================= */}

          <img
            src="/images/parallax/02-city1.png"
            alt=""
            className="
              parallax-layer
              layer-city
            "
            aria-hidden="true"
          />

          {/* =================================================
              ENVIRONMENT
          ================================================= */}

          <img
            src="/images/parallax/03-environment1.png"
            alt=""
            className="
              parallax-layer
              layer-environment
            "
            aria-hidden="true"
          />

          {/* =================================================
              FOREGROUND
              
              PERSONAGEM
              MESA
              COMPUTADOR
              LIVROS
              LUMINÁRIA
          ================================================= */}

          <img
            src="/images/parallax/04-foreground1.png"
            alt=""
            className="
              parallax-layer
              layer-foreground
            "
            aria-hidden="true"
          />

        </div>

        {/* =================================================
            OVERLAY
        ================================================= */}

        <div
          className="hero-overlay"
          aria-hidden="true"
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="hero-content">

          <span className="hero-badge">
            FULL STACK DEVELOPER
          </span>

          <h1 className="hero-title">
            José Mario
            <br />

            <span>
              Developer.
            </span>
          </h1>

          <p className="hero-description">
            Desenvolvedor Full Stack
            apaixonado por criar
            experiências digitais modernas,
            interfaces interativas e
            aplicações web.
          </p>

          <div className="hero-actions">

            <button
              type="button"
              className="hero-button"
              onClick={() =>
                scrollToSection(
                  "projects"
                )
              }
            >
              Ver projetos
            </button>

            <button
              type="button"
              className="
                hero-button
                hero-button-outline
              "
              onClick={() =>
                scrollToSection(
                  "about"
                )
              }
            >
              Sobre mim
            </button>

          </div>

        </section>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <div
          className="scroll-indicator"
          aria-hidden="true"
        >
          <span />

          <p>
            SCROLL
          </p>
        </div>

      </div>
    </main>
  );
}