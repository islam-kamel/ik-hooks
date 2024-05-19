import {useCallback, useEffect, useState} from "react";

const _useAsync = <T, E = Error>(asyncFunction: () => Promise<T>) => {
  const [inProgress, setInProgress] = useState(true);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    (async () => {
      setInProgress(true);
      setValue(null);
      setError(null);

      try {
        const response = await asyncFunction();
        setValue(response);
      } catch (error) {
        setError(error as E);
      } finally {
        setInProgress(false);
      }
    })();
  }, [asyncFunction]);


  useEffect(() => {
    execute();
  }, [execute]);

  return {execute, inProgress, value, error};
}
export {_useAsync};