import { useState } from "react";
import debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";

import InfiniteScroll from "react-infinite-scroll-component";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import useFetchCharacters from "./useFetchCharacters";

import "./Character.css";

function Character() {
  const [queryName, setQueryName] = useState("");
  const [queryStatus, setQueryStatus] = useState("");

  // destructuring the custom hook for fetching the data from the API and passing the state as parameters to the custom hook
  const { loading, data, error, hasMore, setHasMore, setPageNumber } =
    useFetchCharacters(queryName, queryStatus);

  // putting the handleSearch function in a debounce function to prevent the function from being called too many times, on every keystroke
  const debouncedHandleSearch = debounce(handleSearch, 400);

  // setting the handleSearch function to set the queryName state to the value of the input text field value
  // resetting the pageNumber and hasMore state to their initial values
  // this function is called when the user types in the input field
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryName(e.target.value);
    setPageNumber(1);
    setHasMore(true);
  }

  // setting the handleCheck function to set the queryStatus state to the value of the input check field value
  // resetting the pageNumber and hasMore state to their initial values
  // this function is called when the user checks the input field
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryStatus(e.target.value);
    setPageNumber(1);
    setHasMore(true);
  }

  // setting the nextPage function to update the pageNumber state by 1
  // this function is called when the user scrolls down to the bottom of the page
  function nextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  return (
    <div className="characters">
      <Container>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Character</InputGroup.Text>
          <Form.Control
            onChange={debouncedHandleSearch}
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <div className="mb-4 text-start">
          Character status:
          <span>&nbsp;</span>
          <Form.Check
            onChange={handleCheck}
            value=""
            inline
            type="radio"
            id="any"
            label="Any"
            name="status"
          />
          <Form.Check
            onChange={handleCheck}
            value="alive"
            inline
            type="radio"
            id="alive"
            label="Alive"
            name="status"
          />
          <Form.Check
            onChange={handleCheck}
            value="dead"
            inline
            type="radio"
            id="dead"
            label="Dead"
            name="status"
          />
          <Form.Check
            onChange={handleCheck}
            value="unknown"
            inline
            type="radio"
            id="unknown"
            label="Unknown"
            name="status"
          />
        </div>
      </Container>
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={nextPage}
          hasMore={hasMore}
          loader={loading ? <h4>Loading...</h4> : null}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Container>
            <Row>
              {data.map((character) => (
                <Col key={uuidv4()} xs={12} sm={6} md={4} lg={3}>
                  <div className="character">
                    <img
                      style={{
                        maxWidth: "100%",
                      }}
                      src={character.image}
                      alt={character.name}
                    />
                    <h3 className="mt-3">{character.name}</h3>
                    <p>{character.species}</p>
                    <p>{character.status}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </InfiniteScroll>
      )}
      {error && (
        <div>
          <em>{error}</em>
        </div>
      )}
    </div>
  );
}

export default Character;
