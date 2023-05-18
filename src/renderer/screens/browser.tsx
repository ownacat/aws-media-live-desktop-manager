import { FileItem, fetchFilesByPath } from 'actions/files';
import { AppDispatch } from 'config/store';
import prettyBytes from 'pretty-bytes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filesSelector } from 'store/files';

export default function Browser() {
  const dispatch = useDispatch<AppDispatch>();
  const files = useSelector(filesSelector);
  useEffect(() => {
    dispatch(fetchFilesByPath('/'));
  }, [dispatch]);

  const renderFileRow = (file: FileItem) => {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {file.Name}
        </th>
        <td className="px-6 py-4">{file.Type}</td>
        <td className="px-6 py-4">
          {file.ContentLength ? prettyBytes(file.ContentLength) : '-'}
        </td>
        <td className="px-6 py-4">{file.LastModified}</td>
        <td className="px-6 py-4" />
      </tr>
    );
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Filename
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Last Modified
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{files.map(renderFileRow)}</tbody>
      </table>
    </div>
  );
}
