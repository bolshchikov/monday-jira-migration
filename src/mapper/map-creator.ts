import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';

const DEFAULT_CREATOR = 'yaara.wertheim';

export const mapCreator = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  if (mondayTask.creator) {
    to.creator = mondayTask.creator.email.split('@')[0];
  } else {
    to.creator = DEFAULT_CREATOR;
  }
  return to;
};