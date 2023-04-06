import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useAuth, signUp } from "api/auth";

function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const hasEmptyFields =
    !email || !name || !surname || !password || !repeatPassword;
  const passwordsNotSame =
    password !== repeatPassword || (password === "" && repeatPassword === "");
  const canSignup = !hasEmptyFields && !passwordsNotSame;

  const [errors, setErrors] = useState([]);
  const { signIn } = useAuth();
  async function handleSignupButtonClick() {
    if (canSignup) {
      try {
        const { data } = await signUp({
          name,
          surname,
          email,
          password,
          repeatPassword,
        });
        if (data.id) {
          signIn({ email, password });
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
                      setIsChanged(true);
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
                      setIsChanged(true);
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
                      setIsChanged(true);
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
                      setIsChanged(true);
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
                      setIsChanged(true);
                      setRepeatPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              {(!canSignup || errors.length !== 0) && isChanged ? (
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
                disabled={!canSignup}
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
