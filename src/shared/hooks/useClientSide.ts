import { useEffect, useState } from 'react';

export const useClientSide = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
};
