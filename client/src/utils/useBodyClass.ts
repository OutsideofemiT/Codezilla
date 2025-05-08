// src/Utils/useBodyClass.ts
import { useEffect } from 'react';

export const useBodyClass = (className: string) => {
  useEffect(() => {
    console.log(`✅applying body class: ${className}`);

    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);
};
