import { useEffect } from 'react';

function useTimeout<T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number
) {
  useEffect(() => {
    const timer = setTimeout(cb, delay);

    return () => clearTimeout(timer);
  }, []);
}

export const useTimeout2 = <T extends unknown[]>(
  cb: (params: T) => void,
  delay: number
) => {
  useEffect(() => {
    const timer = setTimeout(cb, delay);

    return () => clearTimeout(timer);
  }, []);
};

// useInterval((name:string) => {})
const useInterval = <T extends unknown[]>(
  cb: (params: T) => void,
  delay: number
) => {
  useEffect(() => {
    const timer = setInterval(cb, delay);

    return () => clearInterval(timer);
  }, []);
};

export default function useTimer() {
  return { useTimeout, useInterval };
}

/** new-version

import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  const cbRef = useRef(cb);
  const argsRef = useRef(args);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const setup = useCallback(() => {
    timerRef.current = setTimeout(cbRef.current, delay, ...argsRef.current);
  }, [delay]);

  const clear = useCallback(() => clearTimeout(timerRef.current), []);
  // const reset = () => {};

  useEffect(() => {
    setup();

    return clear;
  }, [setup, clear]);
};

export const useIntervalx = <
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  useEffect(() => {
    const timer = setInterval(cb, delay, ...args);

    return () => clearInterval(timer);
  }, [cb, delay, args]);
};

function useTimer<T extends (...args: Parameters<T>) => ReturnType<T>>(
  this: {
    timerFn: typeof setInterval | typeof setTimeout;
    clearFn: typeof clearInterval | typeof clearInterval;
  },
  cb: T,
  delay: number,
  ...args: Parameters<T>
) {
  const cbRef = useRef(cb);
  const argsRef = useRef(args);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fn = useCallback(this.timerFn, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fn2 = useCallback(this.clearFn, []);
  const timerRef = useRef<ReturnType<typeof fn>>();

  const setup = useCallback(() => {
    timerRef.current = fn(cbRef.current, delay, ...argsRef.current);
  }, [fn, delay]);

  const clear = useCallback(() => fn2(timerRef.current), [fn2]);
  // const reset = () => {};

  useEffect(() => {
    setup();

    return clear;
  }, [setup, clear]);
}

export const useInterval = useTimer.bind({
  timerFn: setTimeout,
  clearFn: clearTimeout,
});

*/
