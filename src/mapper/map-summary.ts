import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

export const mapSummary = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  to.summary = mondayTask.name;
  return to;
};