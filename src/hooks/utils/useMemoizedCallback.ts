import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[]
): T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps);
};

export default useMemoizedCallback;
