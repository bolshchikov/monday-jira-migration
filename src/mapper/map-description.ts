import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';
import { clearFromHTML } from '../utils/sanitize-text';

export const mapDescription = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  const updates = mondayTask.updates.reduce((acc, { body }) => {
    return acc += clearFromHTML(body) + '\n\n';
  }, '');

  to.description = updates;

  const opsTicket = mondayTask.column_values.find(c => c.title === 'JIRA');

  if (opsTicket && opsTicket.text) {
    to.description += `\nOps ticket: ${opsTicket.text}`
  }

  return to;
};