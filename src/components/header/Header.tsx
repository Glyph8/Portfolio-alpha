import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>Header
        <nav className={styles.nav}>
            <ul>about me</ul>
            <ul>portfolio</ul>
            <ul>skills</ul>
            <ul>time line</ul>
        </nav>
    </div>
  )
}
