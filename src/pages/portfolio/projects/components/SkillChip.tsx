interface SkillChipProps {
    iconUrl: string;
    name: string;
}

export default function SkillChip(props: SkillChipProps) {
  return (
    <div className="skill-chip">
      <img src={props.iconUrl} alt={props.name} />
      <span>{props.name}</span>
    </div>
  )
}
