import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';
import { EPICS_MAP } from './maps';

export const mapEpicLink = (mondayTask: TMondayItem, to: TCsvIssue, isSubItem = false): TCsvIssue => {
  if (isSubItem) {
    to.epicLink = '';
    return to;
  }
  const epicColumn = mondayTask.column_values.find(c => c.title === 'Epic');
  if (epicColumn && epicColumn.text) {
    to.epicLink = EPICS_MAP[(epicColumn.text ?? 'Generic') as keyof typeof EPICS_MAP];
  }
  return to;
};