import { Header } from "./components/Header/Header";
import { SmoothScroll } from "./components/SmoothScroll/SmoothScroll";
import { ParallaxHero } from "./components/ParallaxHero/ParallaxHero";
import { About } from "./components/About/About";
import { Projects } from "./components/Projetos/Projects";

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

      <section
        id="projects"
    
      >
        <Projects />
      </section>

      <section
        id="skills"
        className="scroll-section"
      >
        <div className="scroll-section-content">
          <span>03</span>

          <h2>Habilidades</h2>

          <p>
            Em breve vamos colocar sua stack.
          </p>
        </div>
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