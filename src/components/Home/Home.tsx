import { HomeProps } from "../../types/dataTypes";
import styles from "./Home.module.scss";

const Home: React.FC<HomeProps> = ({ date, heartRate, tags }) => {
  console.log("heartRate", heartRate?.heartRateData);
  console.log("tags", tags?.tagData);

  const tagText = tags?.tagData
    // .filter(({ text }) => !!text)
    .map(({ text, timestamp, tags }, idx) => {
      const time = timestamp.slice(11, 16);
      // console.log("typeof tags", tags);
      const tagArr = tags.map((tag) => {
        // console.log("tag", tag);
        return (
          <span className={styles.genericTags}>
            {tag.replace("tag_generic_", "")}{" "}
          </span>
        );
      });
      // console.log("tagArr", tagArr);
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
      <h1 className={styles.dateHeadline}>{date}</h1>
      <h2 className={styles.tagsHeadline}>Tags:</h2>
      {tagText}
    </div>
  );
};

export default Home;
