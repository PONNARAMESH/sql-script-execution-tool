import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hi!! Buddy</h1>
        <h3><i>Get start coding to build your UI for SQL-SCRIPT-EXECUTION-TOOL</i></h3>
      </main>
      <footer className={styles.footer}>
        Hey!! It's me from FOOTER
      </footer>
    </div>
  );
}
