import styles from "./About.module.css";

interface AboutProps {
    id: string;
}

export default function About(props: AboutProps) {
  return (
    <div className={styles.container}>{props.id}</div>
  )
}
