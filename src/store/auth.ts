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

const authenticateAction: CaseReducer<AtuhState, PayloadAction<AtuhState>> = (
  state,
  action
) => {
  state.arn = action.payload.arn;
  state.awsToken = action.payload.awsToken;
  state.awsSecret = action.payload.awsSecret;
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: authenticateAction,
  },
});
export const { authenticate } = auth.actions;
export default auth;
