import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

export const mapDescription = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  to.description = mondayTask.updates[0]?.body ?? '';
  return to;
};