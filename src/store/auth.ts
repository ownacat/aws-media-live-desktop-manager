import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit';

type AtuhState = {
  arn: string | null;
  awsToken: string | null;
  awsSecret: string | null;
};

const initialState: AtuhState = {
  arn: null,
  awsToken: null,
  awsSecret: null,
};

const authenticate: CaseReducer<AtuhState, PayloadAction<string>> = (
  state,
  action
) => {
  state.arn = action.payload;
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate,
  },
});

export default auth;
