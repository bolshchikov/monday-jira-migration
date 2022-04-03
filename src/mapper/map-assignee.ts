import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

const userNameToJiraName = (columnText: string): string => {
  const owners = columnText.split(',');
  const [firstName, ...restName] = owners[0].split(' ');       // JIRA doesn't support several owners, therefore we will take the first one
  return `${firstName.toLowerCase()}.${restName.map(s => s.toLowerCase()).join('')}`;
}

export const mapAssignee = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  const mondayOwnerColumn = mondayTask.column_values.find(c => c.title === 'Owner');
  if (!mondayOwnerColumn) {
    throw new Error('Column "Owner" is missing');
  }
  const defaultAssignee = '';
  to.assignee = mondayOwnerColumn.text ? userNameToJiraName(mondayOwnerColumn.text) : defaultAssignee;
  return to;
};