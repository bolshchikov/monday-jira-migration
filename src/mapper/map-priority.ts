import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';
import { PRIORITY_MAP } from './maps';

export const mapPriority = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  const mondayPriorityColumn = mondayTask.column_values.find(c => c.title === 'Priority');
  if (!mondayPriorityColumn) {
    throw new Error('Column "Priority" is missing');
  }
  const defaultPriority = 'P2' as const;
  to.priority = PRIORITY_MAP[(mondayPriorityColumn.text ?? defaultPriority) as keyof typeof PRIORITY_MAP];
  return to;
};