import  React, { useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import { Box, Flex, Text, Skeleton, useMediaQuery } from '@chakra-ui/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MessageBox from "./MessageBox";

import { getError } from "../utils";
import FeaturedArt from "./FeaturedArt";
import './css/featured-carousel.css';
import { Store } from "../Store";





const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, arts: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload, arts: [] };
        default:
            return state;
    }
};





const Featured = () => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:800px)");

    const [{ loading, error, arts }, dispatch] = useReducer(reducer, {
        arts: [],
        error: '',
        loading: true,
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get('https://fanartiks.onrender.com/api/arts');
                console.log(result)
                console.log(result.data)
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
        <Flex flexDir={isNotSmallerScreen ? "row" : "column"} style={{position: 'relative', top: "-80px"}} maxW="100vw">
            <Flex w={isNotSmallerScreen ? "40%" : "100%"} justify="center" align="center">
                <Text fontSize="5xl" textAlign="center">
                    This week's featured artworks
                </Text>
            </Flex>
            <Slider {...settings} className={isNotSmallerScreen ? "featured-large" : "featured-small"}>
            {
                loading ? (
                    <Skeleton h='300' />
                ) : error ? (
                    <Flex align="center" justify="center"><MessageBox variant="danger">{error}</MessageBox></Flex>
                ) : (
                    arts.map((art) => (
                        <Box key={art.slug}>
                          <FeaturedArt art={art}></FeaturedArt>
                        </Box>
                    ))
                )
            }
            
        </Slider>
      </Flex>
    )
}

export default Featured