import styles from "./styles.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import PaginationItem from "@components/PaginationItem";

function Pagination({ paginationParams, currentPage, onChange }) {
  // States
  const { count, perOne } = paginationParams;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [page, setPage] = useState(currentPage ?? 0);

  // View computed values
  const minIndex = page * perOne + 1;
  const maxIndex = (page + 1) * perOne;

  const getCurentIndexes = () =>
    Array(maxIndex - minIndex + 1)
      .fill()
      .map((_, idx) => minIndex + idx)
      .filter((idx) => idx <= count);

  const getLastPage = () => Math.ceil(count / perOne) - 1;

  const isActive = (index) => index === currentIndex;
  const canGoLeft = page !== 0 && count !== 0;
  const canGoRight = page !== getLastPage() && count !== 0;

  // Click handlers
  const indexClickHandler = (index) => {
    setCurrentIndex(index);
    onChange({ index });
  };

  const leftButtonClickHandler = (e) => {
    e.preventDefault();
    setPage(page - 1);
    onChange({ index });
  };

  const rightButtonClickHandler = (e) => {
    e.preventDefault();
    setPage(page + 1);
    onChange({ index });
  };

  // Inner Components
  function LeftButton({ active, onClick }) {
    const classes = classNames(styles.leftButton, {
      [styles.disabled]: !active,
    });
    return (
      <li className={classes} onClick={onClick}>
        <a href="#" aria-label="Сторінка назад">
          Назад
        </a>
      </li>
    );
  }

  function RightButton({ active, onClick }) {
    const classes = classNames(styles.rightButton, {
      [styles.disabled]: !active,
    });
    return (
      <li className={classes} onClick={onClick}>
        <a href="#" aria-label="Сторінка вперед">
          Вперед
        </a>
      </li>
    );
  }

  return (
    <ul className={styles.pagination}>
      <LeftButton active={canGoLeft} onClick={leftButtonClickHandler} />
      {getCurentIndexes().map((index) => (
        <PaginationItem
          index={index}
          active={isActive(index)}
          onClick={indexClickHandler}
          key={index}
        />
      ))}
      <RightButton active={canGoRight} onClick={rightButtonClickHandler} />
    </ul>
  );
}

export default Pagination;
