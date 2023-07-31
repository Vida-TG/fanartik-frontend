import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { Card, Stack, Image, CardBody, CardFooter, Heading, Text, Flex, Button, ButtonGroup, Divider } from '@chakra-ui/react'

function FeaturedArt(props) {
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
  <Flex justify="center" align="center">
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
        <Image
            src={art.image}
            alt={art.name}
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
        />
        <Stack>
            <CardBody>
            <Link to={`/art/${art.slug}`}>
                <Heading size='md'>{art.name}</Heading>
            </Link>
        
            <Text py='2'>
                Caffè latte is a coffee beverage of Italian origin made with espresso
                and steamed milk.
            </Text>
            </CardBody>
    
            <CardFooter>
            {art.countInStock === 0 ? (
                <Button disabled>
                    Out of stock
                </Button>
            ) : (
                <Button variant='solid' colorScheme='blue' onClick={() => addToCartHandler(art)}>
                    Add to cart
                </Button>
            )}
            <Text color='blue.300' pl="3" fontSize='2xl'>
                ${art.price}
            </Text>
            </CardFooter>
        </Stack>
    </Card>
  </Flex>
  );
}
export default FeaturedArt;
