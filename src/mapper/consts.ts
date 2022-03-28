import { TCsvIssue } from '../jira/types';

export const ENGAGEMENT_DEFAULT_VALUES: Partial<TCsvIssue> = {
  creator: 'yaara.wertheim',
  ce: 1,
  productOwner: 'yaara.wertheim',
  bugNature: 'Functionality',
  stage: 'Production',
  team: 'Approve -> Engagement',
  regressionBug: 'Yes',
  productArea: 'Procurement',
  taskCategory: 'Inherited from Epic',
  parentId: undefined
};

export const ONBOARDING_DEFAULT_VALUES: Partial<TCsvIssue> = {
  creator: 'anat.gat',
  ce: 1,
  productOwner: 'anat.gat',
  bugNature: 'Functionality',
  stage: 'Production',
  team: 'Approve -> Onboarding',
  regressionBug: 'Yes',
  productArea: 'Procurement',
  taskCategory: 'Inherited from Epic',
  parentId: undefined
};