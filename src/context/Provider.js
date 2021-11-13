import { createContext, useState, useEffect } from "react";
import getOuraData from "../utilities/getOuraData";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [ouraData, setOuraData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOuraData();

      setOuraData(data);
    };
    fetchData();
  }, [setOuraData]);

  // console.log(`ouraData`, ouraData);

  return (
    <GlobalContext.Provider value={{ ouraData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
