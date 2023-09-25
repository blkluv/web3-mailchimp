import { useEffect, useRef } from "react";

export function useInterval(callback, interval) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback?.current();
    }
    if (interval !== null) {
      let id = setInterval(tick, interval * 1000);
      return () => clearInterval(id);
    }
  }, [interval]);
}
