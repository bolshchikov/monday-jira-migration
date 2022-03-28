import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

const userNameToJiraName = (userName: string): string => {
  const [firstName, lastName] = userName.split(' ');
  return firstName.toLowerCase() + '.' + lastName.toLowerCase();
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