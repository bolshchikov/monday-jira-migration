import fs from 'fs';
import Papa from 'papaparse';
import { TCsvIssue } from './types';

export const generateCSV = async (data: TCsvIssue[]) => {
  const csv = Papa.unparse(data);
  console.log('Generating CSV...');
  const name = `${process.cwd()}/output-${Date.now()}.csv`;
  fs.writeFileSync(name, csv);
  console.log(`CSV generated at ${name}`);
};