import { useEffect, useRef } from "react";

export function useInterval(callback, interval) {
  const savedCallback = useRef();
  console.log("Inside useInterval");

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback?.current();
    }
    console.log(savedCallback, "saved callback?");
    if (interval !== null) {
      console.log("not null?", interval);
      let id = setInterval(tick, interval * 1000);
      console.log(id, "wats ID? in setInterval");
      return () => clearInterval(id);
    }
  }, [interval]);
}
