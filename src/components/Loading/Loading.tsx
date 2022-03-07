import styles from "./Loading.module.scss";
import { LoadingProps } from "../../types/dataTypes";

const Loading: React.FC<LoadingProps> = ({ isBedroom }) => {
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
