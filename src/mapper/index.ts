import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';
import { mapAssignee } from './map-assignee';
import { mapCE } from './map-ce';
import { mapCreator } from './map-creator';
import { mapDescription } from './map-description';
import { mapEpicLink } from './map-epic-link';
import { mapIssueType } from './map-issue-type';
import { mapPriority } from './map-priority';
import { mapStatus } from './map-status';
import { mapSummary } from './map-summary';
import { mapUserImpact } from './map-user-impact';

const mapInit = (defaults: Partial<TCsvIssue>): TCsvIssue => {
  return {
    summary: '',
    issueType: 'CD User Story',
    status: '',
    priority: 'Major',
    reporter: '',
    description: '',
    epicLink: '',
    taskCategory: '',
    userImpact: '',
    regressionBug: '',
    bugCategory: 'Backlog bug',
    ...defaults
  }
};

export const mapFromMondayToJira = (tasks: TMondayItem[], defaults: Partial<TCsvIssue>) => {
  return tasks
    .filter((task: TMondayItem) => task.state === 'active')
    .filter((task: TMondayItem) => {
      const disallowedStatuses = ['Done', 'Won\'t Fix', 'Can\'t Reproduce'];
      const statusColumn = task.column_values.find(column => column.title === 'Status');
      if (statusColumn) {
        const status = statusColumn.text ?? '';
        return !disallowedStatuses.includes(status);
      }
    })
    .map((task: TMondayItem, idx) => {
      let to = mapInit(defaults);
      to = mapSummary(task, to);
      to = mapIssueType(task, to);
      to = mapPriority(task, to);
      to = mapStatus(task, to);
      to = mapCreator(task, to);
      to = mapAssignee(task, to);
      to.reporter = to.creator;
      to = mapDescription(task, to);
      to = mapUserImpact(task, to);
      to = mapEpicLink(task, to);
      to = mapCE(task, to);
      to.issueId = idx + 1;
      return to;
    });
};