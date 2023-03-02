import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import { getToken, signup } from "api/auth";
import { setToken } from "api/utils/tokenService";
import Router from "next/router";

function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const hasEmptyFields =
    !email || !name || !surname || !password || !repeatPassword;
  const passwordsNotSame =
    password !== repeatPassword || (password === "" && repeatPassword === "");
  const canSignup = !hasEmptyFields && !passwordsNotSame;

  const [errors, setErrors] = useState([]);
  async function handleSignupButtonClick() {
    if (canSignup) {
      try {
        const { data } = await signup(
          email,
          name,
          surname,
          password,
          repeatPassword
        );
        if (data) {
          const token = (await getToken(email, password)).data;
          setToken(token);
          Router.push({ pathname: "/" });
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          let errors = [];
          if (data.password) {
            errors = [...errors, ...data.password];
          }
          if (data.email) {
            errors.concat(...errors, ...data.email);
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
          <h2 className={styles.popupHeader}>Реєстрація</h2>
          <div className={styles.popupContent}>
            <form action="#" method="get">
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder="Електронна пошта"
                    required=""
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Ім'я"
                    required=""
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    type="text"
                    name="surname"
                    placeholder="Прізвище"
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required=""
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className={styles.inputLine}>
                <label className={styles.inputLabel}>
                  <input
                    className={styles.input}
                    type="password"
                    name="repeat-password"
                    placeholder="Повтор паролю"
                    required=""
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              {!canSignup || errors.length !== 0 ? (
                <div className={styles.errorContainer}>
                  <p className={styles.errorContainerHeader}>
                    Помилки реєстрації:
                  </p>
                  <ul className={styles.errorsList}>
                    {hasEmptyFields ? (
                      <li className={styles.error}>Порожні поля для вводу</li>
                    ) : null}
                    {passwordsNotSame ? (
                      <li className={styles.error}>Паролі не співпадають</li>
                    ) : null}
                    {errors.map((error, index) => (
                      <li className={styles.error} key={index}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <button
                className={styles.button}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignupButtonClick();
                }}
              >
                Зареєструватись
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registration;
