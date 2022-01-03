import Papa from "papaparse";

// Converts CSV into JSON
export const parseFile = (file, setParsedCsvData) => {
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      setParsedCsvData(results.data);
    },
  });
};
