import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';


export const mapCreator = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  if (mondayTask.creator) {
    to.creator = mondayTask.creator.email.split('@')[0];
  }
  return to;
};