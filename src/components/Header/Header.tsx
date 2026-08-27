import { useEffect, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./Header.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const smoother = ScrollSmoother.get();

    if (!smoother) {
      const section = document.getElementById(id);

      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    smoother.scrollTo(`#${id}`, true);
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <button
          className="header-logo"
          onClick={() => scrollToSection("home")}
          aria-label="Voltar para o início"
        >
          JM<span>.</span>
        </button>

        <nav className="header-nav">
          <button onClick={() => scrollToSection("home")}>
            Home
          </button>

          <button onClick={() => scrollToSection("about")}>
            Sobre
          </button>

          <button onClick={() => scrollToSection("projects")}>
            Projetos
          </button>

          <button onClick={() => scrollToSection("skills")}>
            Habilidades
          </button>

          <button onClick={() => scrollToSection("contact")}>
            Contato
          </button>
        </nav>

        <button
          className="header-contact"
          onClick={() => scrollToSection("contact")}
        >
          Vamos conversar
        </button>
      </div>
    </header>
  );
}