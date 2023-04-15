import styles from "./styles.module.scss";
import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState(false);
  const canLogin = email && password;

  const { signIn } = useAuth();
  async function login() {
    if (canLogin) {
      setErrors([]);
      try {
        await signIn({ email, password });
        Router.push({ pathname: "/" });
      } catch (error) {
        if (error.graphQLErrors) {
          let errors = [];
          for (error of error.graphQLErrors) {
            errors = [...errors, error.message];
          }
          setErrors(errors);
        }
      }
    }
  }

  return (
    <>
      <section>
        <div className={styles.popup}>
          <Link
            className={styles.closeButton}
            href="/"
            aria-label="Закрити вікно"
          >
            Закрити вікно
          </Link>
          <h2 className={styles.popupHeader}>Вхід</h2>
          <div className={styles.popupContent}>
            <form action="#" method="get">
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Електронна пошта"
                    onChange={(e) => {
                      setIsChanged(true);
                      setErrors([]);
                      setEmail(e.target.value);
                    }}
                    required=""
                  />
                </label>
              </div>
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={(e) => {
                      setIsChanged(true);
                      setErrors([]);
                      setPassword(e.target.value);
                    }}
                    required=""
                  />
                </label>
              </div>
              {!canLogin && isChanged ? (
                <p className={styles.errorContainerHeader}>
                  Немає паролю чи пошти
                </p>
              ) : null}
              {errors.length > 0
                ? errors.map((error, index) => (
                    <p className={styles.errorContainerHeader} key={index}>
                      {error}
                    </p>
                  ))
                : null}
              <button
                className={styles.button}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
                disabled={!canLogin}
              >
                Увійти
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
