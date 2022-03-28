import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

export const mapIssueType = (mondayTask: TMondayItem, to: TCsvIssue, isSubItem = false): TCsvIssue => {
  if (isSubItem) {
    to.issueType = 'Sub-task';
    return to;
  }

  const mondayTypeColumn = mondayTask.column_values.find(c => c.title === 'Type');
  if (!mondayTypeColumn) {
    throw new Error('Column "Type" is missing');
  }
  if (mondayTypeColumn.text === 'Bug') {
    to.issueType = 'Bug';
  } else {
    to.issueType = 'CD User Story';
  }
  return to;
};