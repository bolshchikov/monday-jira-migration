import { cloneDeep } from 'lodash';
import { mapInit } from '../../src/mapper';
import { mapAssignee } from '../../src/mapper/map-assignee';
import emptyMondayTask from '../fixtures/monday-engagement-empty.json';

const setOwner = (value: string) => {
  const copy = cloneDeep(emptyMondayTask);
  const ownerColumn = copy.column_values.find(col => col.title === 'Owner');
  if (ownerColumn) {
    ownerColumn.text = value;
  }
  return copy;
};

describe('Map assignee', () => {
  it.each([
    ['Sergey Bolshchikov', 'sergey.bolshchikov'],
    ['Sergey Bolshchikov, Marc Lousky', 'sergey.bolshchikov'],
    ['Sergey King Bolshchikov', 'sergey.king.bolshchikov']
  ])('should map name correctly', (input, expected) => {
    const taskWithOwner = setOwner(input);
    const issue = mapInit({});
    mapAssignee(taskWithOwner, issue);
    expect(issue.assignee).toEqual(expected);
  });
});