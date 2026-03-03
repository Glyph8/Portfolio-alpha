import type { ReactNode } from "react";
import styles from "./PortfolioLayout.module.css";

interface ProjectLayoutProps {
    titleSlot: ReactNode;
    infoSlot: ReactNode;
    skillsSlot: ReactNode;
    overviewSlot: ReactNode;
    readmeSlot: ReactNode;
    actionSlot: ReactNode;
}

export default function PortfolioLayout({
    titleSlot, infoSlot, skillsSlot, overviewSlot, readmeSlot, actionSlot
}: ProjectLayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{titleSlot}</div>

            <section className={styles.projectHeader}>
                <div className={styles.projectInfo}>
                    <div className={styles.projectInfoItem}>{infoSlot}</div>
                    <div className={styles.techStacks}>{skillsSlot}</div>
                </div>
                <div className={styles.projectOverview}>{overviewSlot}</div>
            </section>

            <div className={styles.readme}>{readmeSlot}</div>
            <nav className={styles.actions}>{actionSlot}</nav>
        </div>
    );
}