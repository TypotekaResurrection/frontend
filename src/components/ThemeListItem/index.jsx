import styles from "./styles.module.scss";
import classNames from "classnames";
import { useState } from "react";

function ThemeListItem({ title, onClick, state, count, notClickable }) {
  const [active, setActive] = useState(state || false);
  const className = classNames(styles.listItem, {
    [styles.active]: active,
    [styles.notClickable]: notClickable,
  });

  function handleClick(e) {
    e.preventDefault();
    setActive(!active);
    if (onClick) {
      onClick({ title });
    }
  }

  return (
    <a href="#" className={className} onClick={handleClick}>
      {title}
      <sup>{count}</sup>
    </a>
  );
}

export default ThemeListItem;
