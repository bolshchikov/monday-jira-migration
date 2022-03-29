export type TCsvIssue = {
  summary: string;
  issueType: 'CD User Story' | 'Bug' | 'Sub-task';
  status: string;
  priority: 'Blocker' | 'Critical' | 'Major' | 'Minor' | 'Trivial';
  reporter?: string;
  creator?: string;
  assignee?: string;
  description: string;
  ce?: number;
  epicLink: string;
  productOwner?: string;
  productArea?: 'Procurement';
  taskCategory: string;
  team?: string;
  userImpact: string;
  bugNature?: 'Functionality';
  stage?: 'Production';
  regressionBug: string;
  bugCategory: 'Backlog bug';
  apiChanges?: string;
  issueId?: number; // for non sub-tasks
  parentId?: number;
}