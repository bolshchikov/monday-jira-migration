import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';
import { clearFromHTML } from '../utils/sanitize-text';

export const mapDescription = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  to.description = clearFromHTML(mondayTask.updates[0]?.body ?? '');
  const opsTicket = mondayTask.column_values.find(c => c.title === 'JIRA');
  if (opsTicket && opsTicket.text) {
    to.description += `\nOps ticket: ${opsTicket.text}`
  }
  return to;
};