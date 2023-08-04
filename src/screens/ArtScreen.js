import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

import { Box, Flex, Badge, Card, Text, Skeleton, Image, useMediaQuery, Stack, Heading, CardBody, CardFooter, Button, Spacer } from '@chakra-ui/react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_art':
      return { ...state, art: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, art: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


function ArtScreen() {
  const amount = 5;

  const [isNotSmallerScreen] = useMediaQuery("(min-width:800px)");
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, art }, dispatch] =
    useReducer(reducer, {
      art: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`https://fanartiks.onrender.com/api/arts/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === art._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`https://fanartiks.onrender.com/api/arts/${art._id}`);
    if (data.noOfPieces < quantity) {
      window.alert('Sorry. Artwork is sold out');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...art, quantity },
    });
    navigate('/cart');
  };


  return (
    <Box>
      <Helmet>
        <title>{art.name}</title>
      </Helmet>
      {loading ? (
        <Box pt="30px"><Skeleton h='400' w='100%'/></Box>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <Box pt="20px">
        {
          userInfo._id === art.creator &&
          <Flex w="100%" mb="20px">
            <Spacer/>
            <Button variant='light' colorScheme='yellow' onClick={() => navigate(`/creator/art/${art._id}`)}>
              Edit
            </Button>
          </Flex>
        }
        <Card
          direction={{ base: 'column', md: 'row' }}
          overflow='hidden'
          bg="rgba(0,0,0, 0.1)"
        >
          <Image
              src={art.image}
              alt={art.name}
              objectFit='cover'
              border='2px solid rgba(0,0,0, 0.1)'
              maxW={{ base: '100%', md: '350px' }}
          />
          <Stack>
              <CardBody minH='250'>
                <Link to={`/art/${art.slug}`}>
                    <Heading w='100' textAlign='center' size='lg'>{art.name}</Heading>
                </Link>
            
                <Text py='2'>
                    {art.description}
                </Text>
              </CardBody>
      
              <CardFooter>
                <Flex flexDir="column" w="100%" align="center">
                  {art.noOfPieces > 0 ? (
                    <Box m="15px 0px"><Text display="inline">Status: </Text><Badge ml='1' fontSize='0.8em' display="inline" colorScheme='green' p="7px">Available</Badge></Box>
                  ) : (
                      <Box m="15px 0px"><Text display="inline">Status: </Text><Badge ml='1' fontSize='0.8em' display="inline" colorScheme='red' p="7px">Sold Out</Badge></Box>
                  )}
                  {art.noOfPieces > 0 && (
                      <Button variant='solid' colorScheme='blue' onClick={() => addToCartHandler(art)}>
                          Add to cart
                      </Button>
                  )}
                  <Text color='blue.300' pl="3" fontSize='2xl'>
                      ${art.price}
                  </Text>
                </Flex>
              </CardFooter>
          </Stack>
      </Card>
      </Box>
      )}
    </Box>
  )
}
export default ArtScreen;