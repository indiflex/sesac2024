import { useEffect } from 'react';

const useTimeout = <T extends unknown[]>(
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
