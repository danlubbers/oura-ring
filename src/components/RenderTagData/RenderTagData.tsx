import { useContext } from "react";
import styles from "./RenderTagData.module.scss";
import { GlobalContext } from "../../context/Provider";

const RenderTagData = () => {
  const {
    todaysData: {
      data: { tags },
    },
  } = useContext(GlobalContext);

  const tagText = tags?.tagData.map(({ text, timestamp, tags }, idx) => {
    const time = timestamp.slice(11, 16);

    const tagArr = tags.map((tag, idx) => {
      return (
        <span className={styles.genericTags} key={idx}>
          {tag.replace("tag_generic_", "")}{" "}
        </span>
      );
    });

    return (
      <ul className={styles.tagsWrapper} key={idx}>
        <li className={styles.tagList}>
          <p className={styles.tagText}>
            {text} {tagArr}
          </p>
          <p className={styles.tagTime}>{time}</p>
        </li>
      </ul>
    );
  });

  return (
    <div className={styles.tagsContainer}>
      <h2 className={styles.tagsHeadline}>Tags:</h2>
      {tagText ? (
        tagText
      ) : (
        <p className={styles.noTagText}>
          Nothing has been tagged today or the tags are not yet available to be
          fetched from the server!
        </p>
      )}
    </div>
  );
};

export default RenderTagData;
