import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { Card, Image, CardBody, Heading, Text, Flex, Button } from '@chakra-ui/react'

function Art(props) {
  const { art } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === art._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`https://fanartiks.onrender.com/api/arts/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Artwork is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card maxW='sm'>
      <CardBody>
        <Link to={`/art/${art.slug}`}>
          <Image
            src={art.image}
            alt={art.name}
            borderRadius='lg'
            h="250"
          />
        </Link>
        <Flex flexDir='column' align='center' mt='3'>
          <Link to={`/art/${art.slug}`}>
            <Heading size='md'>{art.name}</Heading>
          </Link>
          <Text color='blue.600' fontSize='2xl'>
            ${art.price}
          </Text>
        </Flex>
        <Flex w="100%" justify='center' align='center'>
          {art.countInStock === 0 ? (
            <Button disabled>
              Out of stock
            </Button>
          ) : (
            <Button variant='solid' colorScheme='blue' onClick={() => addToCartHandler(art)}>
              Add to cart
            </Button>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}
export default Art;
