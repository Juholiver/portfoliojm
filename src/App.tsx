import { Header } from "./components/Header/Header";
import { SmoothScroll } from "./components/SmoothScroll/SmoothScroll";
import { ParallaxHero } from "./components/ParallaxHero/ParallaxHero";
import { About } from "./components/About/About";
import { Projects } from "./components/Projetos/Projects";
import { Skills } from "./components/Habilidades/Skills";

function App() {
  return (
    <SmoothScroll>
      <Header />

      <section id="home">
        <ParallaxHero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section
        id="contact"
        className="scroll-section secondary-section"
      >
        <div className="scroll-section-content">
          <span>04</span>

          <h2>Contato</h2>

          <p>
            Em breve vamos criar seu contato.
          </p>
        </div>
      </section>
    </SmoothScroll>
  );
}

export default App;