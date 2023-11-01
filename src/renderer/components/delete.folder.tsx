import Button from 'ui/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { fileSelector, pathSelector } from 'selectors/files';
import { AppDispatch, RootState } from 'config/store';
import {
  calculateFolderSizeByPath,
  deleteFolderSizeByPath,
} from 'actions/files';
import { useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';

const STATE_LOADING = 'loading';
const STATE_LOADED = 'loaded';
const STATE_INIT = 'init';
const STATE_DELETING = 'deleting';

export default function DeleteFolder({ path }: { path: string }) {
  const currentPath = useSelector(pathSelector);
  const file = useSelector((state: RootState) => fileSelector(state, path));
  const [state, setState] = useState<string>(STATE_INIT);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (file?.ContentLength) {
      setState(STATE_LOADED);
    }
  }, [file?.ContentLength]);

  function deleteFiles() {
    if (state === STATE_INIT) {
      dispatch(calculateFolderSizeByPath(path));
      setState(STATE_LOADING);
    }

    if (state === STATE_LOADED) {
      setState(STATE_DELETING);
      dispatch(deleteFolderSizeByPath(path));
    }
  }

  function renderButtonText() {
    if (state === STATE_INIT) {
      return 'Delete [check size]';
    }
    if (state === STATE_LOADING) {
      return 'Delete [checking]';
    }
    if (state === STATE_LOADED) {
      return `Delete ${prettyBytes(file?.ContentLength as number)} - ${
        file?.fileCount
      } files`;
    }

    if (state === STATE_DELETING) {
      return `Deleting ${prettyBytes(file?.ContentLength as number)} - ${
        file?.fileCount
      } files`;
    }

    return '';
  }

  if (currentPath !== '/') {
    return null;
  }

  return (
    <Button.Secondary
      onClick={() => deleteFiles()}
      className="px-0 py-0 mr-0 mb-0 disabled"
      disabled={state === STATE_LOADING || state === STATE_DELETING}
      loading={state === STATE_LOADING || state === STATE_DELETING}
    >
      {renderButtonText()}
    </Button.Secondary>
  );
}
