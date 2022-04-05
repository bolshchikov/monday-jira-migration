import { PROJECT_KEY } from '../jira/consts';
import { TCsvIssue } from '../jira/types';

export const ENGAGEMENT_DEFAULT_VALUES: Partial<TCsvIssue> = {
  apiChanges: 'None',
  bugNature: 'Functionality',
  ce: 1,
  creator: 'yaara.wertheim',
  epicLink: `${PROJECT_KEY}-85`,
  parentId: undefined,
  productArea: 'Procurement',
  productOwner: 'yaara.wertheim',
  regressionBug: 'Yes',
  stage: 'Production',
  taskCategory: 'Inherited from Epic',
  team: 'Approve -> Engagement',
  userImpact: 'All',
};

export const ONBOARDING_DEFAULT_VALUES: Partial<TCsvIssue> = {
  apiChanges: 'None',
  bugNature: 'Functionality',
  ce: 1,
  creator: 'anat.gat',
  epicLink: `${PROJECT_KEY}-336`,
  parentId: undefined,
  productArea: 'Procurement',
  productOwner: 'anat.gat',
  regressionBug: 'Yes',
  stage: 'Production',
  taskCategory: 'Inherited from Epic',
  team: 'Approve -> Onboarding',
  userImpact: 'All',
};

export const GROWTH_DEFAULT_VALUES: Partial<TCsvIssue> = {
  apiChanges: 'None',
  bugNature: 'Functionality',
  ce: 1,
  creator: 'leah.sperer',
  epicLink: `${PROJECT_KEY}-440`,
  parentId: undefined,
  productArea: 'Procurement',
  productOwner: 'leah.sperer',
  regressionBug: 'Yes',
  stage: 'Production',
  taskCategory: 'Inherited from Epic',
  team: 'Approve -> Growth',
  userImpact: 'All',
};