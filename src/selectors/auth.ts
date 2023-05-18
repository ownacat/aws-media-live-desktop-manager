import { RootState } from 'config/store';

export const isAuthenciatedSelector = (state: RootState): boolean =>
  state.auth.awsSecret !== null && state.auth.awsToken !== null;

export default null;
