import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handledClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener('click', handledClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handledClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
