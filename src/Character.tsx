import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Character({ data }) {

  return (
    <Container>
      <Row>
        {data.map((character) => (
            <Col key={character.id} xs={12} sm={6} md={4} lg={3}>
                <div className="character">
                    <img style={{
                        maxWidth: "100%",
                      }} src={character.image} alt={character.name} />
                    <h3>{character.name}</h3>
                    <p>{character.species}</p>
                    <p>{character.status}</p>
                </div>
            </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Character;
