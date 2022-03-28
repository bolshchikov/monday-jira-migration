export type TMondayBoard = {
  state?: string;
  items: TMondayItem[];
};

export type TMondayItem = {
  name: string;
  state: string;
  creator: {
    email: string;
  };
  column_values: TMondayColumnValue[];
  subitems?: TMondayItem[];
  updates: TMondayUpdate[];
};

export type TMondayColumnValue = {
  text: string | null;
  title: string;
};

export type TMondayUpdate = {
  body: string;
};