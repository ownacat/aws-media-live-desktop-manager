import { FileItem, fetchFilesByPath } from 'actions/files';
import { AppDispatch } from 'config/store';
import prettyBytes from 'pretty-bytes';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalculateFolderSize from 'renderer/components/calulate.size';
import CurrentPath from 'renderer/components/currentPath';
import FolderIcon from 'renderer/components/folderIcon';
import Loader from 'renderer/components/loader';
import VideoModal from 'renderer/components/modal.video';
import OrderDirection from 'renderer/components/orderDirection';
import PlayVideo from 'renderer/components/play.video';
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
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  useEffect(() => {
    dispatch(fetchFilesByPath('/'));
  }, [dispatch]);

  const filteredFiles = useMemo(() => {
    if (!searchFilter) {
      return files;
    }

    return files.filter((file) => {
      if (searchFilter[0] === '/' && file.Name) {
        try {
          if (file.Name.match(new RegExp(searchFilter.slice(1))) === null) {
            return null;
          }
        } catch (e) {}
      } else if (file.Name) {
        if (!file.Name.includes(searchFilter)) {
          return null;
        }
      }

      return true;
    });
  }, [files, searchFilter]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setSearchFilter(null);
    } else {
      setSearchFilter(e.target.value);
    }
  };

  const renderFileSize = (file: FileItem) => {
    return (
      <>
        {prettyBytes(file.ContentLength as number)}
        {file.fileCount ? <> ({file.fileCount} files)</> : null}
      </>
    );
  };

  const renderFileRow = (file: FileItem) => {
    return (
      <tr
        key={file.Type === 'FOLDER' ? file.Name : file.ETag}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4 flex space-x-1 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {file.Type === 'FOLDER' ? (
            <FolderIcon
              path={file.Name as string}
              onClick={() => {
                setSearchFilter(null);
              }}
            />
          ) : null}
          <span>{file.Name}</span>
        </td>
        <td className="px-6 py-4">
          {file.ContentLength ? (
            renderFileSize(file)
          ) : (
            <CalculateFolderSize path={file.Name as string} />
          )}
        </td>
        <td className="px-6 py-4">{file.LastModified}</td>
        <td className="px-6 py-4">
          <PlayVideo path={file.Name as string} />
        </td>
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
      <VideoModal />
      <div className="grid grid-cols-4 gap-4 m-1">
        <div className="col-span-3">
          <CurrentPath />
        </div>

        <div className="max-w-sm rounded-lg bg-white  dark:bg-boxdark  flex justify-center items-center">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Total:{' '}
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

      <div className="pt-2 pb-1 pl-1">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            onChange={onSearchChange}
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="items-center flex w-full">
                  <span>Filename ({filteredFiles.length})</span>{' '}
                  <OrderDirection field="name" />
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
              <th scope="col" className="px-6 py-3  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{filteredFiles.map(renderFileRow)}</tbody>
        </table>
      </div>
    </>
  );
}
