import styles from "./ProjectCard.module.css";
import githubLogo from "../../../../assets/icons/ic_github.svg";
import monitorLogo from "../../../../assets/icons/ic_monitor.svg";
import type { ProjectCardProps } from "../../../../types/projec-type";
import { Link } from "react-router-dom";


export default function ProjectCard(props: ProjectCardProps) {

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={props.imageUrl} alt={props.title} className={styles.image} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>
                    <Link to={`/projects/${props.id}`} className={styles.mainLink}>
                        {props.title} <span>↗</span>
                    </Link>
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
                    <Link to={props.projectUrl} className={styles.demoBtn} type="button">
                        <img src={monitorLogo} alt="Live Demo" className={styles.demoIcon} />
                        Live Demo
                    </Link>

                    <Link to={props.githubUrl} className={styles.githubBtn} type="button">
                        <img src={githubLogo} alt="GitHub" className={styles.githubIcon} />
                        GitHub
                    </Link>
                </div>
            </div>
        </article>
    )
}
