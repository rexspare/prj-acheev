import React from 'react';

export default function useInterval(callback: () => void, delay: number) {
  const timeoutRef = React.useRef<number>();
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();
    timeoutRef.current = window.setInterval(tick, delay);
    return () => window.clearInterval(timeoutRef.current);
  }, [delay]);

  return timeoutRef;
};