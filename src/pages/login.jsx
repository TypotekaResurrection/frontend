import Footer from "@components/Footer";
import Header from "@components/Header";
import Login from "@components/Login/Login";
import { useLoginGuard } from "api/auth";
import styles from "./styles.module.scss";

export default function LogIn() {
  //useLoginGuard();
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Login />
      </main>
      <Footer />
    </div>
  );
}
