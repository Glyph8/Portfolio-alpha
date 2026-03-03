import styles from "./TimeLineItem.module.css";

interface TimeLineItemProps {
    imageUrl: string;
    title: string;
    date: string;
    description: string;
}


export const TimeLineItem = ({ imageUrl, title, date, description }: TimeLineItemProps) => {
    return (
        <section className={styles.section}>
            <img src={imageUrl} alt={title} className={styles.image} />
            <div className={styles.info}>
                <h2 className={styles.infoTitle}>{title}</h2>
                <p className={styles.date}>{date}</p>
                <p className={styles.description}>{description}</p>
            </div>
        </section>
    )
}