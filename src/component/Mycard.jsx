import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Mycard(props) {
  return (
    <Card style={{ width: '18rem',height:"20rem" }}>
      <Card.Img variant="top" src={props.img} height={"50%"} style={{objectFit:"cover"}} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Link to={`/details/${props.id}`}><Button variant="primary">Leggi</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default Mycard;