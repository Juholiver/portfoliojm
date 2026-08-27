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

export function ParallaxHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) {
        return;
      }

      /*
       * =====================================================
       * SETUP DAS CAMADAS PARALLAX
       * =====================================================
       */

      const layers = gsap.utils.toArray<HTMLElement>(
        ".parallax-layer"
      );

      layers.forEach((layer) => {
        gsap.set(layer, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
        });
      });

      /*
       * =====================================================
       * MOVIMENTO DO MOUSE
       * =====================================================
       */

      const xSky = gsap.quickTo(
        ".layer-sky",
        "x",
        {
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const ySky = gsap.quickTo(
        ".layer-sky",
        "y",
        {
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const xCity = gsap.quickTo(
        ".layer-city",
        "x",
        {
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const yCity = gsap.quickTo(
        ".layer-city",
        "y",
        {
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const xEnv = gsap.quickTo(
        ".layer-environment",
        "x",
        {
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const yEnv = gsap.quickTo(
        ".layer-environment",
        "y",
        {
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const handleMouseMove = (
        event: MouseEvent
      ) => {
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

        xSky(mouseX * 4);
        ySky(mouseY * 2);

        xCity(mouseX * 8);
        yCity(mouseY * 4);

        xEnv(mouseX * 14);
        yEnv(mouseY * 7);
      };

      window.addEventListener(
        "mousemove",
        handleMouseMove
      );

      /*
       * =====================================================
       * ANIMAÇÃO INICIAL
       * =====================================================
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".hero-badge", {
          opacity: 0,
          y: 30,
          duration: 0.8,
        })
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
       * HERO FADE / SCALE DURANTE O SCROLL
       * =====================================================
       */

      gsap.to(".hero-inner", {
        scrollTrigger: {
          trigger: heroRef.current,

          start: "top top",

          end: "bottom top",

          scrub: true,
        },

        scale: 0.92,

        opacity: 0.3,

        ease: "none",
      });

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

    if (!smoother) {
      const section =
        document.getElementById(id);

      section?.scrollIntoView({
        behavior: "smooth",

        block: "start",
      });

      return;
    }

    smoother.scrollTo(
      `#${id}`,
      true
    );
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

          <img
            src="/images/parallax/01-sky.png"
            alt=""
            className="parallax-layer layer-sky"
            data-speed="0.15"
            aria-hidden="true"
          />

          <img
            src="/images/parallax/02-city.png"
            alt=""
            className="parallax-layer layer-city"
            data-speed="0.35"
            aria-hidden="true"
          />

          <img
            src="/images/parallax/03-char.png"
            alt=""
            className="parallax-layer layer-environment"
            data-speed="0.6"
            aria-hidden="true"
          />

        </div>

        {/* =================================================
            OVERLAY
        ================================================= */}

        <div className="hero-overlay" />

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
            <span>Developer.</span>
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
              className="hero-button hero-button-outline"
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

        <div className="scroll-indicator">

          <span />

          <p>SCROLL</p>

        </div>

      </div>
    </main>
  );
}