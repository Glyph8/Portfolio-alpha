import About from './about/About'
import Skills from './skills/Skills'
import Projects from './projects/Projects'
import TimeLine from './time-line/TimeLine'

export default function Portfolio() {
  return (
    <div>
        Portfolio
        <About id="about"/>
        <Skills id="skills"/>
        <Projects id="projects"/>
        <TimeLine id="timeline"/>
    </div>
  )
}
