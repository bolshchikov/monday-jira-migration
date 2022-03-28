import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

export const mapUserImpact = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  const customerColumn = mondayTask.column_values.find(column => column.title === 'Customer');
  if (customerColumn) {
    to.userImpact = customerColumn.text || '';
  }
  return to;
};