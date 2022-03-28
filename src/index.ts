import dotenv from "dotenv";
dotenv.config();
import * as jira from './jira';
import * as monday from './monday';
import * as mapper from './mapper';
import { ENGAGEMENT_BOARD_ID } from './monday/consts';
import { ENGAGEMENT_DEFAULT_VALUES } from './mapper/consts';

const start = async () => {
  try {
    const tasks = await monday.readBoardTasks(ENGAGEMENT_BOARD_ID);
    const jiraTasks = await mapper.mapFromMondayToJira(tasks, ENGAGEMENT_DEFAULT_VALUES);
    // await jira.generateCSV(jiraTasks);
  } catch (error: any) {
    console.error(error);
  }
};


start();