export const VideoModalId = 'modalVideo';

export default function VideoModal() {
  return (
    <div
      id={VideoModalId}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 space-y-6">
            <div id="videoJsWrapper" />
          </div>
        </div>
      </div>
    </div>
  );
}
