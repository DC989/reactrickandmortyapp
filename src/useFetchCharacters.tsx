import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCharacters = (queryName, queryStatus, pageNumber) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  /* useEffect(() => {
    setData([]);
  }, [query]); */

  useEffect(() => {
    setLoading(true);
    setError(null);

    let cancel;

    axios({
      method: "GET",
      url: "https://rickandmortyapi.com/api/character",
      params: { name: queryName, status: queryStatus, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        /* setData((prevData) => {
          return [...prevData, ...response.data.results];
        }); */
        setData(response.data.results);
        setHasMore(response.data.results.length > 0);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        if (error.response.data.error === "There is nothing here") {
          setData([]);
          setLoading(false);
          setError(error.response.data.error);
          return;
        }
        console.log(error);
        setError(error);
        setLoading(false);
      });
    return () => cancel();
  }, [queryName, queryStatus, pageNumber]);

  return { loading, data, error, hasMore };
};

export default useFetchCharacters;
