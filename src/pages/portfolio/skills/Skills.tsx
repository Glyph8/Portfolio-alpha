import React from 'react'

interface SkillsProps {
    id: string;
}

export default function Skills(props: SkillsProps) {
  return (
    <div id={props.id}>Skills</div>
  )
}
