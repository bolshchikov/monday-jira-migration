import dotenv from 'dotenv';
dotenv.config();
import * as jira from './jira';
import * as monday from './monday';
import * as mapper from './mapper';
import { ONBOARDING_BOARD_ID } from './monday/consts';
import { ONBOARDING_DEFAULT_VALUES } from './mapper/consts';

const start = async () => {
  try {
    const tasks = await monday.readBoardTasks(ONBOARDING_BOARD_ID);
    const jiraTasks = await mapper.mapFromMondayToJira(tasks, ONBOARDING_DEFAULT_VALUES);
    await jira.generateCSV(jiraTasks);
  } catch (error: any) {
    console.error(error);
  }
};


start();