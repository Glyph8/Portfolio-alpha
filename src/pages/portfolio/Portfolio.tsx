import About from "./about/About";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import TimeLine from "./time-line/TimeLine";

export default function Portfolio() {
  return (
    <div>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="timeline">
        <TimeLine />
      </section>
    </div>
  );
}
