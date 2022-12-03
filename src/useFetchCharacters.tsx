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
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios({
      method: "GET",
      url: "https://rickandmortyapi.com/api/character",
      params: { name: queryName, status: queryStatus, page: pageNumber },
    })
      .then((response) => {
        if (pageNumber > 1) {
          setData((prevData) => {
            return [...prevData, ...response.data.results];
          });
        } else {
          setData(response.data.results);
          setHasMore(response.data.results.length > 0);
          setLoading(false);
        }

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

  return { loading, data, error, hasMore };
};

export default useFetchCharacters;
