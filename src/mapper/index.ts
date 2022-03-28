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

const mapTaskToIssue = (task: TMondayItem, defaults: Partial<TCsvIssue>, isSubItem = false): TCsvIssue => {
  let issue: TCsvIssue = mapInit(defaults);
  issue = mapSummary(task, issue);
  issue = mapIssueType(task, issue, isSubItem);
  issue = mapPriority(task, issue);
  issue = mapStatus(task, issue);
  issue = mapCreator(task, issue);
  issue = mapAssignee(task, issue);
  issue.reporter = issue.creator;
  issue = mapDescription(task, issue);
  issue = mapUserImpact(task, issue);
  issue = mapEpicLink(task, issue);
  issue = mapCE(task, issue);
  return issue;
};

export const mapFromMondayToJira = (tasks: TMondayItem[], defaults: Partial<TCsvIssue>): TCsvIssue[] => {
  const filteredTasks = tasks
    .filter((task: TMondayItem) => task.state === 'active')
    .filter((task: TMondayItem) => {
      const disallowedStatuses = ['Done', 'Won\'t Fix', 'Can\'t Reproduce'];
      const statusColumn = task.column_values.find(column => column.title === 'Status');
      if (statusColumn) {
        const status = statusColumn.text ?? '';
        return !disallowedStatuses.includes(status);
      }
    });

  const mappedTasks = filteredTasks.reduce((acc: TCsvIssue[], task: TMondayItem, idx: number) => {
    const issue = mapTaskToIssue(task, defaults);
    issue.issueId = idx + 1;
    acc.push(issue);

    const subitems = task.subitems?.map((subitem: TMondayItem) => {
      const subitemIssue = mapTaskToIssue(subitem, defaults, true);
      subitemIssue.parentId = issue.issueId;
      return subitemIssue;
    }) ?? [];

    acc.push(...subitems);

    return acc;
  }, []);
  return mappedTasks;
};