import styles from "./styles.module.scss";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const EditorMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

function ArticleContent({ articleContent }) {
  return (
    <div className={styles.articleContent}>
      <EditorMarkdown
        warpperElement={{ "data-color-mode": "light" }}
        style={{ background: "transparent" }}
        source={articleContent}
      />
    </div>
  );
}

export default ArticleContent;
