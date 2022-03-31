import { PROJECT_KEY } from '../jira/consts';

export const EPICS_MAP = {
  'Approval Flow': `${PROJECT_KEY}-66`,
  'Catalogue': `${PROJECT_KEY}-86`,
  'Communication': `${PROJECT_KEY}-82`,
  'Contracts': `${PROJECT_KEY}-87`,
  'Currency': `${PROJECT_KEY}-88`,
  'Customized forms': `${PROJECT_KEY}-89`,
  'Dashboard & Reporting': `${PROJECT_KEY}-90`,
  'Drafts': `${PROJECT_KEY}-91`,
  'Employees': `${PROJECT_KEY}-92`,
  'ERP Integration': `${PROJECT_KEY}-83`,
  'File management': `${PROJECT_KEY}-93`,
  'Generic back-office': `${PROJECT_KEY}-94`,
  'Engagement generic': `${PROJECT_KEY}-85`,
  'Global Expansion': `${PROJECT_KEY}-95`,
  'PR-PO': `${PROJECT_KEY}-79`,
  'Quality & Performance': `${PROJECT_KEY}-84`,
  'Receivals': `${PROJECT_KEY}-81`,
  'Segments': `${PROJECT_KEY}-96`,
  'Tech Debt': `${PROJECT_KEY}-98`,
  'Tipalti Integration': `${PROJECT_KEY}-97`,
  'Vendors': `${PROJECT_KEY}-80`,
  'Onboarding generic': `${PROJECT_KEY}-336`,
  'Implementation': `${PROJECT_KEY}-337`,
  'Documentation': `${PROJECT_KEY}-338`,
  'Budget': `${PROJECT_KEY}-339`,
  'User management': `${PROJECT_KEY}-92`,
};

export enum PRIORITY_MAP {
  'Urgent' = 'Blocker',
  'P1' = 'Critical',
  'P2' = 'Major',
  'P3' = 'Minor',
  'P4' = 'Trivial',
}