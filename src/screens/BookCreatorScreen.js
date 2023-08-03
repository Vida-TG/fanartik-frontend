import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Flex } from '@chakra-ui/react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

export default function BookCreatorScreen() {
  const [{ loading, error, loadingCreate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.put(
        `https://fanartiks.onrender.com/api/creator/${userId}`,
        { _id: userId, description, price },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Creator booked successfully');
      navigate('/');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Book Artist ${userId}</title>
      </Helmet>
      <h1>Book Artist</h1>

      {loading ? (
        <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>


          <div className="mb-3">
            <Button disabled={loadingCreate} type="submit">
              Book Artist
            </Button>
            {loadingCreate && <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>}
          </div>
        </Form>
      )}
    </Container>
  );
}
