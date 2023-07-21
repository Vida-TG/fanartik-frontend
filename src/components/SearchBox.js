import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';

export default function SearchBox() {

  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form onSubmit={submitHandler} style={{width: "100%", maxWidth: "1200px"}}>
        <Input
          name="q"
          opacity="0.5"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          style={{fontFamily:"courier, FontAwesome"}}
        />
    </Form>
  );
}
