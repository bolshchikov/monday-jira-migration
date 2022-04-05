import { cloneDeep } from 'lodash';
import { PROJECT_KEY } from '../../src/jira/consts';
import { mapFromMondayToJira } from '../../src/mapper';
import { ENGAGEMENT_DEFAULT_VALUES, ONBOARDING_DEFAULT_VALUES } from '../../src/mapper/consts';
import { TMondayItem } from '../../src/monday/types';
import mondayBug from '../fixtures/monday-engagement-bug.json';
import mondayEmpty from '../fixtures/monday-engagement-empty.json';
import mondayUserStory from '../fixtures/monday-engagement-user-story.json';
import mondayUserStoryWithSubitem from '../fixtures/monday-engagement-user-story-with-items.json';
import { clearFromHTML } from '../../src/utils/sanitize-text';

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
      'Can\'t Reproduce',
      'On hold',
      'Stuck',
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
        reporter: ENGAGEMENT_DEFAULT_VALUES.creator,
        creator: ENGAGEMENT_DEFAULT_VALUES.creator,
        assignee: 'hadar.gat',
        description: clearFromHTML(mondayBug.updates[0].body) + '\n\n\nOps ticket: https://jira.tipalti.com:7000/browse/OP-18394',
        ce: 10,
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
        apiChanges: 'None'
      });
    });
    it('should map an user story', () => {
      const [jiraTasks] = mapFromMondayToJira([mondayUserStory], ENGAGEMENT_DEFAULT_VALUES);
      expect(jiraTasks).toEqual({
        summary: mondayUserStory.name,
        issueType: 'CD User Story',
        status: 'Backlog',
        priority: 'Minor',
        reporter: ENGAGEMENT_DEFAULT_VALUES.creator,
        creator: ENGAGEMENT_DEFAULT_VALUES.creator,
        assignee: '',
        description: clearFromHTML(mondayUserStory.updates[0]?.body ?? '') + '\n\n\nOps ticket: https://jira.tipalti.com:7000/browse/OP-18394',
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
        apiChanges: 'None'
      });
    });
    it('should map a user story with subitem', () => {
      const [issue, subIssue] = mapFromMondayToJira([mondayUserStoryWithSubitem], ENGAGEMENT_DEFAULT_VALUES);
      expect(issue).toEqual({
        summary: mondayUserStoryWithSubitem.name,
        issueType: 'CD User Story',
        status: 'Backlog',
        priority: 'Critical',
        reporter: mondayUserStoryWithSubitem.creator.email.split('@')[0],
        creator: mondayUserStoryWithSubitem.creator.email.split('@')[0],
        assignee: 'marc.lousky',
        description: '',
        ce: 1,
        epicLink: `${PROJECT_KEY}-96`,
        productOwner: 'yaara.wertheim',
        taskCategory: 'Inherited from Epic',
        team: 'Approve -> Engagement',
        userImpact: 'All',
        bugNature: 'Functionality',
        stage: 'Production',
        regressionBug: 'Yes',
        bugCategory: 'Backlog bug',
        productArea: 'Procurement',
        issueId: 1,
        parentId: undefined,
        apiChanges: 'None'
      });
      const subItem = mondayUserStoryWithSubitem.subitems[0];
      expect(subIssue).toEqual({
        summary: subItem.name,
        issueType: 'Sub-task',
        status: 'Backlog',
        priority: 'Major',
        reporter: subItem.creator.email.split('@')[0],
        creator: subItem.creator.email.split('@')[0],
        assignee: 'marc.lousky',
        description: '',
        ce: 1,
        epicLink: ``,
        productOwner: 'yaara.wertheim',
        taskCategory: 'Inherited from Epic',
        team: 'Approve -> Engagement',
        userImpact: 'All',
        bugNature: 'Functionality',
        stage: 'Production',
        regressionBug: 'Yes',
        bugCategory: 'Backlog bug',
        productArea: 'Procurement',
        issueId: undefined,
        parentId: 1,
        apiChanges: 'None'
      });
    });
  });
  describe('Defaults', () => {
    it('should have default values for Engagement', () => {
      const [result] = mapFromMondayToJira([mondayEmpty], ENGAGEMENT_DEFAULT_VALUES);
      expect(result).toHaveProperty('ce', 1);
      expect(result).toHaveProperty('productOwner', 'yaara.wertheim');
      expect(result).toHaveProperty('bugNature', 'Functionality');
      expect(result).toHaveProperty('stage', 'Production');
      expect(result).toHaveProperty('team', 'Approve -> Engagement');
      expect(result).toHaveProperty('regressionBug', 'Yes');
      expect(result).toHaveProperty('productArea', 'Procurement');
      expect(result).toHaveProperty('taskCategory', 'Inherited from Epic');
      expect(result).toHaveProperty('epicLink', `${PROJECT_KEY}-85`);
      expect(result).toHaveProperty('userImpact', 'All');
      expect(result).toHaveProperty('parentId', undefined);
      expect(result).toHaveProperty('apiChanges', 'None');
    });
    it('should have default values for Onboarding', () => {
      const [result] = mapFromMondayToJira([mondayEmpty], ONBOARDING_DEFAULT_VALUES);
      expect(result).toHaveProperty('ce', 1);
      expect(result).toHaveProperty('productOwner', 'anat.gat');
      expect(result).toHaveProperty('bugNature', 'Functionality');
      expect(result).toHaveProperty('stage', 'Production');
      expect(result).toHaveProperty('team', 'Approve -> Onboarding');
      expect(result).toHaveProperty('regressionBug', 'Yes');
      expect(result).toHaveProperty('productArea', 'Procurement');
      expect(result).toHaveProperty('taskCategory', 'Inherited from Epic');
      expect(result).toHaveProperty('epicLink', `${PROJECT_KEY}-336`);
      expect(result).toHaveProperty('userImpact', 'All');
      expect(result).toHaveProperty('parentId', undefined);
      expect(result).toHaveProperty('apiChanges', 'None');
    });
    it.todo('should have default values for Growth');
  });

});