import mondaySdk from 'monday-sdk-js';
import { setTimeout } from 'timers/promises';
import { getAllBoardTasksQuery } from './query';
import { TMondayItem } from './types';

const monday = mondaySdk();
monday.setToken(process.env['MONDAY_API_TOKEN'] as string);

const apiCall = async (boardId: number, page: number) => {
  console.log('Reading page', page);
  const response = await monday.api(getAllBoardTasksQuery, { variables: { boardId, page } });
  if (response['errors']) {
    throw new Error(JSON.stringify(response['errors']));
  }
  return response.data.boards[0].items;
};

async function* queryApi(boardId: number) {
  let page = 1;
  let items = await apiCall(boardId, page);
  while (items.length > 0) {
    yield items;
    page++;
    await setTimeout(1000 * 10);
    items = await apiCall(boardId, page);
  }
}

export const readBoardTasks = async (boardId: number): Promise<TMondayItem[]> => {
  const acc = [];
  console.log('Reading board tasks');
  for await (const items of queryApi(boardId)) {
    acc.push(...items);
  }
  console.log('Finished board tasks');
  console.log('Read total', acc.length);
  return acc;
};
