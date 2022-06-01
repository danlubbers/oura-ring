import { HomeProps } from "../../types/dataTypes";
import styles from "./Home.module.scss";

const Home: React.FC<HomeProps> = ({ tags }) => {
  console.log("tags", tags?.tagData);

  const tagText = tags?.tagData.map(({ text, timestamp, tags }, idx) => {
    const time = timestamp.slice(11, 16);

    const tagArr = tags.map((tag) => {
      return (
        <span className={styles.genericTags}>
          {tag.replace("tag_generic_", "")}{" "}
        </span>
      );
    });

    return (
      <ul className={styles.tagsContainer} key={idx}>
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
    <div className={styles.homeContainer}>
      <h2 className={styles.tagsHeadline}>Tags:</h2>
      {tagText}
    </div>
  );
};

export default Home;
