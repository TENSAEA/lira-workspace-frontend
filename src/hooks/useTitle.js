import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const defaultTitle = document.title;

    document.title = title;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
};
export default useTitle;
