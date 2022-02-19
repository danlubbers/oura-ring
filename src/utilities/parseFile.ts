import Papa from "papaparse";

// Converts CSV into JSON
export const parseFile = (
  file: string,
  setParsedCsvData: (
    obj: {
      Timestamp: string;
      Temperature_Fahrenheit: string;
      Relative_Humidity: string;
    }[]
  ) => void
) => {
  Papa.parse(file, {
    header: true,
    complete: (results: {
      data: {
        Timestamp: string;
        Temperature_Fahrenheit: string;
        Relative_Humidity: string;
      }[];
    }) => {
      setParsedCsvData(results.data);
    },
  });
};
