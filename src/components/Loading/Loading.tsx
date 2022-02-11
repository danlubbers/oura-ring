import styles from "./Loading.module.scss";
const Loading = (isBedroom: boolean) => {
  return (
    <div className={styles.loadingContainer}>
      {isBedroom ? (
        <p className={styles.bedroomDataMissingText}>
          Bedroom data appears to be missing...
        </p>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Loading;
