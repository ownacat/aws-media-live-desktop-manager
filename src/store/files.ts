import {
  CaseReducer,
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { FileItem, calculateFolderSizeByPath, fetchFilesByPath } from 'actions/files';

export type FileSortField = 'name' | 'size' | 'date';
export type FileSortOrder = 'asc' | 'desc';

type FilesState = {
  path: string;
  files: FileItem[];
  loading: boolean;
  sortField: FileSortField;
  sortOrder: FileSortOrder;
};

const initialState: FilesState = {
  path: '/',
  files: [],
  loading: false,
  sortField: 'name',
  sortOrder: 'asc',
};

const setLoadingAction: CaseReducer<FilesState> = (state) => {
  state.loading = true;
};

const setPathAction: CaseReducer<FilesState, PayloadAction<string>> = (
  state,
  path
) => {
  state.path = path.payload;
};

function sortFilesFunction(
  a: FileItem,
  b: FileItem,
  sortField: FileSortField,
  sortOrder: FileSortOrder
): number {
  const orderFactor = sortOrder === 'asc' ? 1 : -1;

  if (a.Type === b.Type) {
    if (sortField === 'name') {
      if (a.Name) {
        return a.Name.localeCompare(b?.Name ?? '') * orderFactor;
      }
      return 0;
    }

    if (sortField === 'size') {
      if (a.ContentLength && b.ContentLength) {
        return (a.ContentLength - b.ContentLength) * orderFactor;
      }
      return 0;
    }
  }
  if (a.Type === 'FOLDER') {
    return -1;
  }
  return 0;
}

const setOrderAction: CaseReducer<
  FilesState,
  PayloadAction<{ field: FileSortField; order: FileSortOrder }>
> = (state, payload) => {
  state.sortOrder = payload.payload.order;
  state.sortField = payload.payload.field;
  state.files = state.files
    .slice()
    .sort((a, b) => sortFilesFunction(a, b, state.sortField, state.sortOrder));
};

const auth = createSlice<FilesState, SliceCaseReducers<FilesState>>({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: setLoadingAction,
    setPath: setPathAction,
    setOrder: setOrderAction,
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchFilesByPath.fulfilled, (state, action) => {
      state.files = action.payload.sort((a, b) =>
        sortFilesFunction(a, b, state.sortField, state.sortOrder)
      );
      state.loading = false;
    });

    builder.addCase(calculateFolderSizeByPath.fulfilled, (state, action) => {
      const path = action.meta.arg;
      const [totalCount, totalSize] = action.payload as number[];

      state.files = state.files.map((file) => {
        if(file.Name === path){
            file.ContentLength = totalSize;
            file.fileCount = totalCount;
        }
        return file;
      });

    });
    builder.addCase(fetchFilesByPath.pending, (state, action) => {
      const path = action.meta.arg;
      state.path = path;
      state.loading = true;
    });
  },
});

export const { setLoading, setPath, setOrder } = auth.actions;
export const { reducer } = auth;
export default auth.reducer;
