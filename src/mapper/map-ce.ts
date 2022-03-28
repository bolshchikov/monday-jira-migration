import { TCsvIssue } from '../jira/types';
import { TMondayItem } from '../monday/types';
import { DEFAULT_CE, POSSIBLE_CE } from '../jira/consts';
import { findClosest } from '../utils/closest-number';

export const mapCE = (mondayTask: TMondayItem, to: TCsvIssue): TCsvIssue => {
  const EstColumn = mondayTask.column_values.find(c => c.title === 'Est.');
  if (EstColumn) {
    to.ce = findClosest(
      POSSIBLE_CE,
      parseInt(EstColumn.text ?? DEFAULT_CE.toString(), 10)
    );
  }
  return to;
};