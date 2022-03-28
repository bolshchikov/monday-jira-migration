import fs from 'fs';
import Papa from 'papaparse';
import { TCsvIssue } from './types';

export const generateCSV = async (data: TCsvIssue[]) => {
  const csv = Papa.unparse(data);
  fs.writeFileSync(`${process.cwd()}/output-${Date.now()}.csv`, csv);
};