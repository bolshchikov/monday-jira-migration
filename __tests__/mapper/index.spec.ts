import { cloneDeep } from 'lodash';
import { PROJECT_KEY } from '../../src/jira/consts';
import { mapFromMondayToJira } from '../../src/mapper';
import { ENGAGEMENT_DEFAULT_VALUES } from '../../src/mapper/consts';
import { TMondayItem } from '../../src/monday/types';
import mondayBug from '../fixtures/monday-engagement-bug.json';
import mondayUserStory from '../fixtures/monday-engagement-user-story.json';

describe('Mapper', () => {
  describe('Filters', () => {
    it('should return null if state is not active', () => {
      const task = {
        ...mondayBug,
        state: 'archived',
      };
      const result = mapFromMondayToJira([task], ENGAGEMENT_DEFAULT_VALUES);
      expect(result).toEqual([]);
    });
    it.each([
      'Done',
      'Won\'t Fix',
      'Can\'t Reproduce'
    ])('should return null if status is `%s`', (text) => {
      const task: TMondayItem = cloneDeep(mondayBug);
      const statusColumn = task.column_values.find(column => column.title === 'Status');
      if (statusColumn) {
        statusColumn.text = text;
      }
      const result = mapFromMondayToJira([task], ENGAGEMENT_DEFAULT_VALUES);
      expect(result).toEqual([]);
    });
  });
  describe('Transformations', () => {
    it('should map a opened bug', () => {
      const [jiraTasks] = mapFromMondayToJira([mondayBug], ENGAGEMENT_DEFAULT_VALUES);
      expect(jiraTasks).toEqual({
        summary: mondayBug.name,
        issueType: 'Bug',
        status: 'Open',
        priority: 'Minor',
        reporter: mondayBug.creator.email.split('@')[0],
        creator: mondayBug.creator.email.split('@')[0],
        assignee: 'hadar.gat',
        description: mondayBug.updates[0].body,
        ce: 5,
        epicLink: `${PROJECT_KEY}-79`,
        productOwner: 'yaara.wertheim',
        team: 'Approve -> Engagement',
        userImpact: 'Riskified',
        bugNature: 'Functionality',
        taskCategory: 'Inherited from Epic',
        stage: 'Production',
        regressionBug: 'Yes',
        bugCategory: 'Backlog bug',
        productArea: 'Procurement',
        issueId: 1,
        parentId: undefined,
      });
    });
    it('should map an user story', () => {
      const [jiraTasks] = mapFromMondayToJira([mondayUserStory], ENGAGEMENT_DEFAULT_VALUES);
      expect(jiraTasks).toEqual({
        summary: mondayUserStory.name,
        issueType: 'CD User Story',
        status: 'Backlog',
        priority: 'Minor',
        reporter: mondayUserStory.creator.email.split('@')[0],
        creator: mondayUserStory.creator.email.split('@')[0],
        assignee: '',
        description: mondayUserStory.updates[0].body,
        ce: 2,
        epicLink: `${PROJECT_KEY}-79`,
        productOwner: 'yaara.wertheim',
        taskCategory: 'Inherited from Epic',
        team: 'Approve -> Engagement',
        userImpact: 'Riskified',
        bugNature: 'Functionality',
        stage: 'Production',
        regressionBug: 'Yes',
        bugCategory: 'Backlog bug',
        productArea: 'Procurement',
        issueId: 1,
        parentId: undefined,
      });
    });
  });

});