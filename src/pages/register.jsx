import Footer from "@components/Footer";
import Header from "@components/Header";
import Registration from "@components/Registration/Registration";
import { useLoginGuard } from "api/auth";
import styles from "./styles.module.scss";

export default function NewUserRegistration() {
  //useLoginGuard();
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Registration />
      </main>
      <Footer />
    </div>
  );
}
