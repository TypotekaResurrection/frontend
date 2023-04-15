import Footer from "@components/Footer";
import Header from "@components/Header";
import Search from "@components/Search/Search";
import { useAuth } from "api/auth";
import styles from "./styles.module.scss";

export default function NotFound() {
  const { isSignedIn, isStaff } = useAuth();
  return (
    <div className={styles.wrapper}>
      <Header isUser={isSignedIn()} isAdmin={isStaff} />
      <Search />
      <Footer />
    </div>
  );
}
