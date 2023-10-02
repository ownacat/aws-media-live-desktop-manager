import { Modal } from 'flowbite';

import Button from 'ui/button/button';
import type { ModalOptions, ModalInterface } from 'flowbite';
import videojs from 'video.js';
import { VideoModalId } from './modal.video';
import 'video.js/dist/video-js.css';
import { useSelector } from 'react-redux';

import { pathSelector } from 'selectors/files';

export default function PlayVideo({ path }: { path: string }) {
  const currentPath = useSelector(pathSelector);

  let player = null;
  function initVideo() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: `https://d387613w8yyayj.cloudfront.net/${path}/index.m3u8`,
          type: 'application/x-mpegURL',
        },
      ],
    };

    const $videoJsWrapper: HTMLElement = document.querySelector(
      '#videoJsWrapper'
    ) as HTMLElement;

    const videoElement = document.createElement('video-js');

    videoElement.classList.add('vjs-big-play-centered');
    $videoJsWrapper.appendChild(videoElement);

    player = videojs(videoElement, videoJsOptions, () => {
      videojs.log('player is ready');
    });
  }

  function hide() {
    if (player) {
      player.dispose();
    }
  }

  function show() {
    console.log(path);

    const $modalElement: HTMLElement = document.querySelector(
      `#${VideoModalId}`
    ) as HTMLElement;

    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses:
        'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
        hide();
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      },
    };

    const modal: ModalInterface = new Modal($modalElement, modalOptions);

    modal.show();
    initVideo();
  }

  console.log(currentPath);
  // for subpath we don't have play function
  if (currentPath !== '/') {
    return null;
  }

  return (
    <Button.Secondary onClick={() => show()} className="px-0 py-0 mr-0 mb-0">
      Play
    </Button.Secondary>
  );
}
