import { useState } from "react";

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
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, data, error, hasMore, setHasMore } = useFetchCharacters(
    queryName,
    queryStatus,
    pageNumber
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryName(e.target.value);
    setPageNumber(1);
    setHasMore(true);
  }

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryStatus(e.target.value);
    setPageNumber(1);
    setHasMore(true);
  }

  function nextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  return (
    <div className="characters">
      <Container>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Character</InputGroup.Text>
          <Form.Control
            onChange={handleSearch}
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
          <em>No characters found...</em>
        </div>
      )}
    </div>
  );
}

export default Character;
