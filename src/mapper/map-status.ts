import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

export const mapStatus = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  if (to.issueType === 'Bug') {
    to.status = 'Open';
  } else {
    to.status = 'Backlog';
  }
  return to;
};