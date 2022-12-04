import { useState, useEffect } from "react";
import axios from "axios";

// setting the API response data types
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

// setting the custom hook for fetching the data
const useFetchCharacters = (queryName: string, queryStatus: string) => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    // setting the loading state to true and error state to null when the data is being fetched
    setLoading(true);
    setError("");

    // if there is no more data to fetch, don't fetch
    if (!hasMore) return;

    // fetching the data from the API
    axios({
      method: "GET",
      url: "https://rickandmortyapi.com/api/character",
      params: { name: queryName, status: queryStatus, page: pageNumber },
    })
      .then((response) => {
        // if there is no more data (no more pages) to fetch, set hasMore to false
        if (response.data.info.next === null) {
          setHasMore(false);
        }

        // setting the data state to the data fetched from the API + the previous data
        // this is to prevent the data from being overwritten when the user scrolls down
        if (pageNumber > 1) {
          setData((prevData) => {
            return [...prevData, ...response.data.results];
          });
        } else {
          // if the page number is 1, set the data state to the data fetched from the API
          // this overwrites the previous data when the user searches for a new character or changes the status
          setData(response.data.results);
        }

        // setting the loading state to false when the data is fetched successfully and hide the loader
        setLoading(false);
      })
      .catch(() => {
        // setting the data state to an empty array when the data is not fetched successfully
        setData([]);
        // setting the error state to the error message when the data is not fetched successfully
        setError("No characters found...");
        // setting the loading state to false when the data is not fetched successfully and hide the loader
        setLoading(false);
        setHasMore(false);
      });
  }, [queryName, queryStatus, pageNumber]);

  return {
    loading,
    data,
    error,
    hasMore,
    setHasMore,
    pageNumber,
    setPageNumber,
  };
};

export default useFetchCharacters;
