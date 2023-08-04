import { Box, Button, Flex, Image, Text, Skeleton } from '@chakra-ui/react'
import logo from './assets/images/topaz.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import React, { useContext, useState, useEffect, useReducer } from "react";
import { Store } from "../Store";
import MessageBox from "./MessageBox";

import { getError } from "../utils";
import Art from "./Art";




const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, arts: action.payload, loading: false, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload, arts: {} };
        default:
            return state;
    }
};



const ItemTypes = () => {
    
    const [ type1, setType1 ] = React.useState(true)
    const [ type2, setType2 ] = React.useState(false)
    const [ type3, setType3 ] = React.useState(false)

    const width = window.innerWidth;
    let slidesNum;
    if (width <= 800) {
        slidesNum = 1
    } else {
        slidesNum = 2
    }
    

    const [{ loading, error, arts }, dispatch] = useReducer(reducer, {
        arts: {},
        error: '',
        loading: true,
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST'});
            try {
                const result = await axios.get('https://fanartiks.onrender.com/api/arts/get-by-category');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
                console.log(err)
            }
        }
        fetchData()
    }, [])



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesNum,
        slidesToScroll: 1
    };

    const type1Clicked = () => {
        setType1(true);
        setType2(false)
        setType3(false)
    }
    const type2Clicked = () => {
        setType1(false);
        setType2(true)
        setType3(false)
    }
    const type3Clicked = () => {
        setType1(false);
        setType2(false)
        setType3(true)
    }
  return (
    <Box w="95%" maxW="900px" m="10px auto" p="30px 3% 50px 3%" borderRadius="20px" bg="rgba(0,0,0, 0.03)">
        <Flex m="10px auto" justify="center">
            <Button m="0px 10px" onClick={type1Clicked} background={type1 ? 'var(--chakra-colors-chakra-body-bg)' : 'none'}>Painting</Button>
            <Button m="0px 10px" onClick={type2Clicked} background={type2 ? 'var(--chakra-colors-chakra-body-bg)' : 'none'}>Digital</Button>
            <Button m="0px 10px" onClick={type3Clicked} background={type3 ? 'var(--chakra-colors-chakra-body-bg)' : 'none'}>Craft</Button>
        </Flex>

        {type1 &&
        <Slider {...settings}>
            {
                loading ? (
                    <Skeleton display="inline" h='300' />
                ) : error ? (
                    <Flex align="center" justify="center"><MessageBox variant="danger">{error}</MessageBox></Flex>
                ) : (
                    arts.painting.map((art) => (
                        <Box key={art.slug} p="0px 2%" w="96%">
                          <Art art={art}></Art>
                        </Box>
                    ))
                )
            }
        </Slider>
        }

        {type2 &&
        <Slider {...settings}>
            {
                loading ? (
                    <Skeleton h='300' />
                ) : error ? (
                    <Flex align="center" justify="center"><MessageBox variant="danger">{error}</MessageBox></Flex>
                ) : (
                    arts.digital.map((art) => (
                        <Box key={art.slug} p="0px 2%" w="96%">
                          <Art art={art}></Art>
                        </Box>
                    ))
                )
            }
        </Slider>
        }
        
        {type3 &&
        <Slider {...settings}>
            {
                loading ? (
                    <Skeleton h='300' />
                ) : error ? (
                    <Flex align="center" justify="center"><MessageBox variant="danger">{error}</MessageBox></Flex>
                ) : (
                    arts.craft.map((art) => (
                        <Box key={art.slug} p="0px 2%" w="96%">
                          <Art art={art}></Art>
                        </Box>
                    ))
                )
            }
        </Slider>
        }
    </Box>
  )
}

export default ItemTypes