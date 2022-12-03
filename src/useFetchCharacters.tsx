import { useState, useEffect } from "react";
import axios from "axios";

type Origin = {
  name: string;
  url: string;
};

type Location = {
  name: string;
  url: string;
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const useFetchCharacters = (
  queryName: string,
  queryStatus: string,
  pageNumber: number
) => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!hasMore) {
      // if there is no more data to fetch, don't fetch
      return;
    }

    axios({
      method: "GET",
      url: "https://rickandmortyapi.com/api/character",
      params: { name: queryName, status: queryStatus, page: pageNumber },
    })
      .then((response) => {
        if (response.data.info.next === null) {
          setHasMore(false);
        }

        if (pageNumber > 1) {
          setData((prevData) => {
            return [...prevData, ...response.data.results];
          });
        } else {
          setData(response.data.results);
        }

        setLoading(false);

        console.log(response.data);
      })
      .catch((error) => {
        setData([]);
        setError(error.response.data.error || "There is nothing here");
        setLoading(false);
        setHasMore(false);

        console.log(error);
      });
  }, [queryName, queryStatus, pageNumber]);

  return { loading, data, error, hasMore, setHasMore };
};

export default useFetchCharacters;
