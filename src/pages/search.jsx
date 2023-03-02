import Footer from "@components/Footer";
import Header from "@components/Header";
import Search from "@components/Search/Search";
import { useAuth } from "api/auth";
import styles from "./styles.module.scss";

export default function NotFound() {
  //const [isUser, isAdmin] = useAuth();
  return (
    <div className={styles.wrapper}>
      <Header isUser={false} isAdmin={false} />
      <Search />
      <Footer />
    </div>
  );
}
