import dotenv from 'dotenv';
dotenv.config();
import * as jira from './jira';
import * as monday from './monday';
import * as mapper from './mapper';
import { GROWTH_BOARD_ID } from './monday/consts';
import { GROWTH_DEFAULT_VALUES } from './mapper/consts';

const start = async () => {
  try {
    const tasks = await monday.readBoardTasks(GROWTH_BOARD_ID);
    const jiraTasks = await mapper.mapFromMondayToJira(tasks, GROWTH_DEFAULT_VALUES);
    await jira.generateCSV(jiraTasks);
  } catch (error: any) {
    console.error(error);
  }
};


start();