import { calculateFolderSizeByPath } from 'actions/files';
import { AppDispatch } from 'config/store';
import prettyBytes from 'pretty-bytes';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'ui/button/button';

const STATE_EMPTY = 'empty';
const STATE_LOADING = 'loading';
const STATE_LOADED = 'loaded';

export default function CalculateFolderSize({ path }: { path: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const [state, setState] = useState<string>(STATE_EMPTY);
  function calucate() {
    dispatch(calculateFolderSizeByPath(path));
    setState(STATE_LOADING);
  }
  switch (state) {
    case STATE_EMPTY:
      return (
        <Button.Secondary
          className="px-0 py-0 mr-0 mb-0"
          onClick={() => calucate()}
        >
          Calculate
        </Button.Secondary>
      );

    case STATE_LOADING:
      return (
        <Button.Secondary
          onClick={() => {}}
          className="px-0 py-0 mr-0 mb-0"
          disabled
          loading
        >
          Calculate
        </Button.Secondary>
      );

    case STATE_LOADED:
      return <>{prettyBytes(10000)}</>;

    default:
      return null;
  }
}
