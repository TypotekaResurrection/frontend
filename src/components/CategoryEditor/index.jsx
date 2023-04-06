import { useState } from "react";
import styles from "./styles.module.scss";

function CategoryEditor({ value, onSave, onDelete, id }) {
  const [title, setTitle] = useState(value);
  return (
    <div className={styles.categoryEditorWrapper}>
      <form action="#" method="POST">
        <input
          type="text"
          name={"category-" + value}
          id={"modify-form-category-" + value}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor={"modify-form-category-" + value}></label>
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave(id, title);
          }}
        >
          Зберегти
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(id);
          }}
        >
          Видалити
        </button>
      </form>
    </div>
  );
}

export default CategoryEditor;
