import { Item } from '@aws-sdk/client-mediastore-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import awsMediaStore from 'api/awsMediaStore';

export type FileItem = Omit<Item, 'LastModified'> & {
  LastModified: string;
  fileCount?: number;
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

export const calculateFolderSizeByPath = createAsyncThunk<number[], string>(
  'files/calculateFolderSizeByPath',
  async (path: string) => {
    return await awsMediaStore.caluculateSizeByPath(path);
  }
);

export const deleteFolderSizeByPath = createAsyncThunk<number, string>(
  'files/deleteFolderSizeByPath',
  async (path: string) => {
    return await awsMediaStore.deleteFilesByPath(path);
  }
);

export default null;
