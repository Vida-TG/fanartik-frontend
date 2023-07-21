import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Art(props) {
  const { art } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === art._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/arts/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Art is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/art/${art.slug}`}>
        <img src={art.image} className="card-img-top" alt={art.name} />
      </Link>
      <Card.Body>
        <Link to={`/art/${art.slug}`}>
          <Card.Title>{art.name}</Card.Title>
        </Link>
        <Rating rating={art.rating} numReviews={art.numReviews} />
        <Card.Text>${art.price}</Card.Text>
        {art.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(art)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Art;
