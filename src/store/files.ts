import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FileItem, fetchFilesByPath } from 'actions/files';

type FilesState = {
  path: string;
  files: FileItem[];
  loading: boolean;
};

const initialState: FilesState = {
  path: '/',
  files: [],
  loading: false,
};

const setLoadingAction: CaseReducer<FilesState> = (state) => {
  state.loading = true;
};

type SetPathType = {
  path: string;
  files: FileItem[];
};

const setPathAction: CaseReducer<FilesState, PayloadAction<string>> = (
  state,
  path
) => {
  state.path = path.payload;
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: setLoadingAction,
    setPath: setPathAction,
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(fetchFilesByPath.fulfilled, (state, action) => {
      state.files = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFilesByPath.pending, (state) => {
      state.loading = true;
    });
  },
});

const isLoadingSelector = (state): boolean => state.files.loading;
const filesSelector = (state): FileItem[] => state.files.files;

export { isLoadingSelector, filesSelector };
export const { setLoading, setPath } = auth.actions;
export const { reducer } = auth;
export default auth.reducer;
