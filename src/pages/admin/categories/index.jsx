import CategoryEditor from "@components/CategoryEditor";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { useAdminGuard } from "api/auth";
import {
  addCategory,
  deleteCategory,
  getCategories,
  saveCategory,
} from "api/categories";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function AdminCategoriesPage() {
  const [currentCategories, setCurrentCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  useAdminGuard();

  useEffect(() => {
    updateCategories();
  }, []);

  async function handleAddButtonClick(e) {
    e.preventDefault();
    if (newCategoryName) {
      try {
        await addCategory(newCategoryName);
        await updateCategories();
        setNewCategoryName("");
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function handleSaveButtonClick(id, name) {
    try {
      await saveCategory(id, name);
      await updateCategories();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCategoryDelete(id) {
    try {
      await deleteCategory(id);
      await updateCategories();
    } catch (e) {
      console.log(e);
    }
  }

  async function updateCategories() {
    try {
      const categories = (await getCategories()).data;
      setCurrentCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Header isUser isAdmin />
      <main className={styles.mainPage}>
        <section className={styles.category}>
          <h1 className={styles.title}>Категорії</h1>
          <section className={styles.addForm}>
            <form action="#" method="POST">
              <input
                type="text"
                name="add-category"
                value={newCategoryName}
                id="add-form-add-category"
                placeholder="Нова категорія"
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                }}
              />
              <label htmlFor="add-form-add-category"></label>
              <button type="submit" onClick={handleAddButtonClick}>
                Додати
              </button>
            </form>
          </section>
          <ul className={styles.categoryList}>
            {currentCategories.map((category) => (
              <CategoryEditor
                value={category.name}
                id={category.id}
                onDelete={handleCategoryDelete}
                onSave={handleSaveButtonClick}
                key={category.name}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AdminCategoriesPage;
