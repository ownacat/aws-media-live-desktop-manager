import { FileItem, fetchFilesByPath } from 'actions/files';
import { AppDispatch } from 'config/store';
import prettyBytes from 'pretty-bytes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrentPath from 'renderer/components/currentPath';
import FolderIcon from 'renderer/components/folderIcon';
import Loader from 'renderer/components/loader';
import OrderDirection from 'renderer/components/orderDirection';
import {
  filesSelector,
  isLoadingSelector,
  totalFilesInPathSelector,
  totalSizeInPath,
} from 'selectors/files';

export default function Browser() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(isLoadingSelector);
  const files = useSelector(filesSelector);
  const totalFile = useSelector(totalFilesInPathSelector);
  const totalSize = useSelector(totalSizeInPath);
  useEffect(() => {
    dispatch(fetchFilesByPath('/'));
  }, [dispatch]);

  const renderFileRow = (file: FileItem) => {
    return (
      <tr
        key={file.ETag}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4 flex space-x-1 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {file.Type === 'FOLDER' ? <FolderIcon /> : null}
          <span>{file.Name}</span>
        </td>
        <td className="px-6 py-4">
          {file.ContentLength ? prettyBytes(file.ContentLength) : '-'}
        </td>
        <td className="px-6 py-4">{file.LastModified}</td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="text-center w-full p-10">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 m-1">
        <div className="col-span-3">
          <CurrentPath />
        </div>
        <div className="max-w-sm rounded-lg bg-white  dark:bg-boxdark  flex justify-center items-center">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalFile}
            </span>{' '}
            size:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {prettyBytes(totalSize)}
            </span>
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="items-center flex w-full">
                  <span>Filename</span> <OrderDirection field="name" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3  ">
                <div className="items-center flex w-full">
                  <span>Size</span> <OrderDirection field="size" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3  ">
                Last Modified
              </th>
            </tr>
          </thead>
          <tbody>{files.map(renderFileRow)}</tbody>
        </table>
      </div>
    </>
  );
}
