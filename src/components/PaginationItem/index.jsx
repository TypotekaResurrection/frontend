import classNames from "classnames";
import styles from "./styles.module.scss";

function PaginationItem({ index, active, onClick }) {
  const classes = classNames(styles.paginationItem, {
    [styles.active]: active,
  });
  return (
    <li
      className={classes}
      onClick={(e) => {
        e.preventDefault();
        onClick(index);
      }}
    >
      <a href="#">{index}</a>
    </li>
  );
}

export default PaginationItem;
