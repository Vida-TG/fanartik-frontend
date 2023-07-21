import  React, { useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import logger from 'use-reducer-logger'
import { Link } from "react-router-dom";
import { Box, Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './css/featured-carousel.css';
import { getError } from "../../utils";
import { Store } from "../../store";





const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, items: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload, items: [] };
        default:
            return state;
    }
};





const Featured = () => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:800px)");

    const [{ loading, error, items }, dispatch] = useReducer(logger(reducer), {
        items: [],
        error: '',
        loading: true,
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get('http://localhost:5000/api/items');
                console.log(result)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
                console.log(err)
            }
        }
        fetchData()
    }, [])


    const { state, dispatch: ctxDispatch } = useContext(Store);
        



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Flex flexDir={isNotSmallerScreen ? "row" : "column"} style={{position: 'relative', top: "-80px"}} w="100vw !important" maxW="100vw">
            <Flex w={isNotSmallerScreen ? "40%" : "100%"} p="5%" justify="center" align="center">
                <Text fontSize="4xl">
                    This week's featured artworks
                </Text>
            </Flex>
            <Slider {...settings} className={isNotSmallerScreen ? "featured-large" : "featured-small"}>
            {
                loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                items.map(
                    item => (
                        <Box key={item.id} className="featured-item">
                                {item.quantity = 1}
                                <Image h="250px" w="300px" borderTopRadius="20" src={item.image} m="auto" background="transparent" />
                                <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                                    <Text textTransform="uppercase" textAlign="center">{item.name}</Text>
                                    <Flex align="center" justify="space-between">
                                        <Flex align="center">
                                            
                                            <Link to={`/item/${item.slug}`}>
                                                <Image h="30px" w="30px" borderRadius="15" src={item.image} />
                                            </Link>

                                            <Flex flexDir="column" m="0px 15px">
                                                <Text fontSize="12px">{item.artist}</Text>
                                                <Text fontSize="12px">@{item.artist}</Text>
                                            </Flex>
                                        </Flex>
                                        <Text>{item.price}Near</Text>
                                    </Flex>
                                    <Button onClick={()=>ctxDispatch({type: 'ADD_TO_CART', payload: {item}})}>ADD TO CART</Button>
                                </Flex>

                        </Box>
                    )
                )
            )}
            
        </Slider>        
      </Flex>
    )
}

export default Featured