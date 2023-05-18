import { Item } from '@aws-sdk/client-mediastore-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import awsMediaStore from 'api/awsMediaStore';

export type FileItem = Omit<Item, 'LastModified'> & {
  LastModified: string;
};

function normalizeItem(item: Item): FileItem {
  return {
    ...item,
    LastModified: item.LastModified?.toISOString() || '',
  };
}

export const fetchFilesByPath = createAsyncThunk<FileItem[], string>(
  'files/fetchFilesByPath',
  async (path: string) => {
    const files = await awsMediaStore.getFiles(path);
    return files.map(normalizeItem);
  }
);

export default null;
