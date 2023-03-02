import Error404 from "@components/Error404/Error404";
import ErrorHeader from "@components/ErrorHeader/ErrorHeader";
import Footer from "@components/Footer";
import styles from "./styles.module.scss";

export default function NotFound() {
    return (<div className={styles.wrapper}>
        <ErrorHeader statusCode={404}/>
        <main className={styles.main}>
        <Error404 />
        </main>
        <Footer />
    </div>
    );
}
