import { useRef, useEffect } from "react";

function useThrottledDispatch<T>(action: (value: T) => void, value: T, delay: number) {
  const valueRef = useRef<T>(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const dispatchAction = () => {
      action(valueRef.current);
      timeoutRef.current = null;
    };

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(dispatchAction, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [action, delay]);
}

export default useThrottledDispatch;
