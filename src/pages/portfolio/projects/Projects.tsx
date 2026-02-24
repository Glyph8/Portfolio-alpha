import React from 'react'

interface ProjectsProps {
    id: string;
}

export default function Projects(props: ProjectsProps) {
  return (
    <div id={props.id}>Projects</div>
  )
}
