import { TimeLineItem } from "./components/TimeLineItem";
import styles from "./TimeLine.module.css";
export default function TimeLine() {
  return <div className={styles.container}>

    <h2 className={styles.title}>TimeLine</h2>

    <TimeLineItem imageUrl="https://placehold.co/400" title="현대오토에버 SW 스쿨 교육과정" date="2025.12.18 ~ 진행중" description="현대오토에버에서 진행하는 SW 스쿨 교육과정입니다." />

    <TimeLineItem imageUrl="https://placehold.co/400" title="자기 설계 학기 - 타임투게더" date="2025.03 ~ 2025.12" description="타임투게더 프로젝트에 참여했습니다." />

    <TimeLineItem imageUrl="https://placehold.co/400" title="쿠잇 스터디 멘토 참가" date="2025.09 ~ 2025.12" description="차콜 프로젝트를 멘토링했습니다." />

    <TimeLineItem imageUrl="https://placehold.co/400" title="쿠잇 스터디 멘티 참가" date="2025.03 ~ 2025.08" description="블락가드 프로젝트를 멘티로 참여했습니다." />

    <TimeLineItem imageUrl="https://placehold.co/400" title="건국대학교 재학" date="2019.03 ~ 졸업 유예 중" description="건국대학교에서 컴퓨터공학을 전공했습니다." />

  </div>;
}
