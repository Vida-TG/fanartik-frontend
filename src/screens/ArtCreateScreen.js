import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import { Flex } from '@chakra-ui/react';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
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

export default function ArtCreateScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loadingCreate }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [noOfPieces, setnoOfPieces] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('category', category);
      formData.append('noOfPieces', noOfPieces);

      await axios.post(
        `https://fanartiks.onrender.com/api/arts`,
        formData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Art created successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };


  return (
    <Container className="small-container">
      <Helmet>
        <title>Create Art</title>
      </Helmet>
      <h1>Create Art</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              value={price}
              type='number'
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="painting">Painting</option>
              <option value="digital">Digital</option>
              <option value="craft">Craft</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="noOfPieces">
            <Form.Label>Number of artworks</Form.Label>
            <Form.Control
              value={noOfPieces}
              type="number"
              onChange={(e) => setnoOfPieces(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button disabled={loadingCreate} type="submit">
              Create
            </Button>
            {loadingCreate && <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>}
          </div>
        </Form>
    </Container>
  );
}
