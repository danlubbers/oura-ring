import Papa from "papaparse";

// Converts CSV into JSON
export const parseFile = (file: string, setParsedCsvData: (obj: object) => void) => { 
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      setParsedCsvData(results.data);
    },
  });
};
