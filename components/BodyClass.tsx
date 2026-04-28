'use client';
import { useEffect } from 'react';

export default function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    document.body.classList.add(className);
    document.documentElement.classList.add(className);
    return () => {
      document.body.classList.remove(className);
      document.documentElement.classList.remove(className);
    };
  }, [className]);
  return null;
}
