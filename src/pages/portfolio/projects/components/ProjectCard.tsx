import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    skillChips: string[];
    projectUrl: string;
    githubUrl: string;
}

export default function ProjectCard(props: ProjectCardProps) {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={props.imageUrl} alt={props.title} className={styles.image} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>
                    <a href={`/portfolio/${props.projectUrl}`} className={styles.mainLink}>
                        {props.title} <span>↗</span>
                    </a>
                </h3>
                <p className={styles.description}>
                    {props.description}
                </p>

                <div className={styles.chips}>
                    {props.skillChips.map((chip, index) => (
                        <span key={index} className={styles.chip}>{chip}</span>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button className={styles.demoBtn} type="button">
                        <img src="/icons/ic_monitor.svg" alt="Live Demo" className={styles.demoIcon} />
                        Live Demo
                    </button>

                    <button className={styles.githubBtn} type="button">
                        <img src="/icons/ic_github.svg" alt="GitHub" className={styles.githubIcon} />
                        GitHub
                    </button>
                </div>
            </div>
        </article>
    )
}
