"use client";
import { useEffect } from 'react';

type MetaOptions = {
  title?: string;
  description?: string;
  keywords?: string;
};

export function useMeta({ title, description, keywords }: MetaOptions) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (name: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
  }, [title, description, keywords]);
}