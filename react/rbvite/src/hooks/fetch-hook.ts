import { useEffect, useState } from 'react';

const UrlMap = new Map<string, unknown>();

export default function useFetch<T>(url: string, deparr: unknown[] = []) {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    if (UrlMap.has(url)) return setResult(UrlMap.get(url) as T);

    const controller = new AbortController();
    const { signal } = controller;
    (async () => {
      console.log('fetchhhh>>', url.substring(20));
      const res = await fetch(url, { signal });
      const data = (await res.json()) as T;
      // console.log('🚀  data:', data);
      setResult(data);
      UrlMap.set(url, data);
    })();

    return () => controller.abort('Clean-Up Fetch!!');
  }, deparr);

  return result;
}
