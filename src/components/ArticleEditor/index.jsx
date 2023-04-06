import styles from "./styles.module.scss";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
function ArticleEditor({ value, onChange }) {
  return (
    <div className={styles.editorWrapper}>
      <div data-color-mode="light">
        <MarkdownEditor value={value} height={500} onChange={onChange} />
        <div style={{ paddingTop: 50 }}></div>
      </div>
    </div>
  );
}

export default ArticleEditor;
