import { fetchFilesByPath } from 'actions/files';
import { AppDispatch } from 'config/store';
import { useDispatch, useSelector } from 'react-redux';
import { pathSelector } from 'selectors/files';

export default function CurrentPath() {
  const dispatch = useDispatch<AppDispatch>();
  const path = useSelector(pathSelector);

  function goBack(): void {
    console.log(path.split('/'));
    if (path.split('/').length <= 2) return;
    const newPath = `${path.split('/').slice(0, -2).join('/')}/`;

    dispatch(fetchFilesByPath(newPath));
  }

  return (
    <div className="relative">
      <button
        onClick={goBack}
        type="button"
        className="absolute left-1 bottom-1 text-blue border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>

        <span className="sr-only">Back</span>
      </button>

      <input
        type="search"
        id="search"
        className="block w-full p-4 pl-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={path}
        disabled
        required
      />
    </div>
  );
}
