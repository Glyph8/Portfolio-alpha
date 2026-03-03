import { TimeLineItem } from "./components/TimeLineItem";
import { TIMELINE_ITEMS } from "./constants";
import styles from "./TimeLine.module.css";
export default function TimeLine() {
  return <div className={styles.container}>

    <h2 className={styles.title}>TimeLine</h2>

    <div className={styles.timeline}>
      {
        TIMELINE_ITEMS.map((item, index) => (
          <TimeLineItem
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            date={item.date}
            description={item.description}
          />
        ))
      }    
    </div>

  </div>;
}
