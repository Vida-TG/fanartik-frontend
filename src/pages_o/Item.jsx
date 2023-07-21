import React, { useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import { useParams } from "react-router-dom"
import { Box } from '@chakra-ui/react';
import axios from 'axios';


const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, item: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload, item: [] };
        default:
            return state;
    }
};

const Item = () => {
    const params = useParams();
    const {slug} = params;


    const [{ loading, error, item }, dispatch] = useReducer(reducer, {
        item: [],
        error: '',
        loading: true,
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get(`http://localhost:5000/api/item/${slug}`);
                console.log(result)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
                console.log(err)
            }
        }
        fetchData()
    }, [slug])


    return (
        loading ? <div>Loading...</div>
        : error ? <div>{ error }</div>
        :
        <div>
            <Helmet>
                <title>{item.name}</title>
            </Helmet>
            <Header />
            <Box m="90px 0px" w="100vw" textAlign="center">{item.name}</Box>
        </div>
    )
}

export default Item