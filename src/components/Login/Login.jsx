import styles from "./styles.module.scss";
import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import { getToken } from "api/auth";
import { setToken } from "api/utils/tokenService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email && password;

  async function login() {
    if (canLogin) {
      try {
        const token = (await getToken(email, password)).data;
        setToken(token);
        Router.push({ pathname: "/" });
        console.debug(token);
      } catch (e) {
        console.log(e);
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
                      setPassword(e.target.value);
                    }}
                    required=""
                  />
                </label>
              </div>
              {!canLogin ? (
                <p className={styles.errorContainerHeader}>
                  Немає паролю чи пошти
                </p>
              ) : null}

              <button
                className={styles.button}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
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
