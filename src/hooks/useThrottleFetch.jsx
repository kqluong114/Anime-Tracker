import { useState, useEffect, useRef } from "react";
import _ from "lodash";

const useThrottleFetch = ({url, throttleRate}) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const throttledFetchRef = useRef(null);

  useEffect(() => {
    const fetchData = async (newUrl) => {
      try {
        const res = await fetch(newUrl);
        const content = await res.json();
        if (res.ok) {
          setData(content);
        }
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    if (!throttledFetchRef.current) {
      throttledFetchRef.current = _.throttle((url) => {
        fetchData(url);
      }, throttleRate);
    }

    throttledFetchRef.current(url);

    return () => {
      throttledFetchRef.current?.cancel();
    };
  }, [url, throttleRate]);

  return {data, error};
}

export default useThrottleFetch;