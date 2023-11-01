import { FileItem } from 'actions/files';
import { RootState } from 'config/store';
import { FileSortField, FileSortOrder } from 'store/files';

export const isLoadingSelector = (state: RootState): boolean =>
  state.files.loading;
export const filesSelector = (state: RootState): FileItem[] =>
  state.files.files;

export const fileSelector = (state: RootState, path: string): FileItem | null =>
  state.files.files.filter((file) => file.Name === path)[0] ?? null;

export const pathSelector = (state: RootState): string => state.files.path;

export const totalFilesInPathSelector = (state: RootState): number =>
  state.files.files.length;

export const totalSizeInPath = (state: RootState): number =>
  state.files.files
    .filter((file) => file.ContentLength)
    .reduce((acc, file) => acc + (file.ContentLength ?? 0), 0);

export const sortFieldSelector = (state: RootState): FileSortField =>
  state.files.sortField;

export const sortOrderSelector = (state: RootState): FileSortOrder =>
  state.files.sortOrder;
