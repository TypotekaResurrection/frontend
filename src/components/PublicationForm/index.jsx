import ArticleEditor from "@components/ArticleEditor";
import ThemeList from "@components/ThemeList";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function PublicationForm({ value, onChange }) {
  const [text, setText] = useState(value.text);
  const [chosenCategories, setChosenCategories] = useState(
    value.chosenCategories
  );
  const [preview, setPreview] = useState(value.preview);
  const [title, setTitle] = useState(value.title);
  const [imageUrl, setImageUrl] = useState(value.imageUrl);

  useEffect(() => {
    onChange({ title, imageUrl, chosenCategories, text, preview });
  }, [title, imageUrl, chosenCategories, text, preview]);

  function handleCategoryChoice({ activeThemes }) {
    setChosenCategories(activeThemes);
  }

  return (
    <div>
      <div className={styles.publicationFormWrapper}>
        <div className={styles.formField}>
          <label htmlFor="title-form-field">
            <input
              type="text"
              name="title"
              placeholder="Заголовок"
              id="title-form-field"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formField}>
          <label htmlFor="photo-url-form-field">
            <input
              type="text"
              name="photoUrl"
              placeholder="Адреса зображення (URL)"
              id="photo-url-form-field"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formField}>
          <label htmlFor="preview-form-field">
            <input
              type="text"
              name="preview"
              placeholder="Превʼю"
              id="preview-form-field"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.categoriesWrapper}>
          <ThemeList
            value={chosenCategories}
            onChange={handleCategoryChoice}
            loadFromSource={true}
          />
        </div>
        <div className={styles.textWrapper}>
          <ArticleEditor value={text} onChange={setText} />
        </div>
      </div>
    </div>
  );
}

export default PublicationForm;
