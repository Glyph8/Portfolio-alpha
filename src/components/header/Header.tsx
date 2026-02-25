import styles from "./Header.module.css";

/** about 에서는 사이드바가 대체하고, skills부터 sidebar는 왼쪽으로 들어가면서 아래로 내려온다. */
export default function Header() {
  return (
    <div className={styles.header}>
      Header
      <nav className={styles.nav}>
        <ul>about me</ul>
        <ul>portfolio</ul>
        <ul>skills</ul>
        <ul>time line</ul>
      </nav>
    </div>
  );
}
