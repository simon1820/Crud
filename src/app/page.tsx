import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Bienvenido a mi proyecto CRUD</h1>
      <p className={styles.subtitle}>
        Un ejemplo con Next.js 14 + React + CSS Modules.
      </p>

      <nav className={styles.nav}>
        <Link href="/login" className={styles.button}>
          Iniciar sesión
        </Link>
      </nav>
    </main>
  );
}
