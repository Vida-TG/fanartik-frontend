import React from 'react'
import './css/carousel1.css'
import { Link } from 'react-router-dom'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Box, Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { data } from "../../data";

const handleDragStart = (e) => e.preventDefault();


const responsive = {
  0: {
    items: 1,
    itemsFit: 'cover',
  },
  554: { items: 2,
    itemsFit: 'cover', },
  960: {
    items: 4,
    itemsFit: 'cover',
  },
  1025: {
    items: 5,
    itemsFit: 'cover',
  },
};

const TopCarousel = () => {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <AliceCarousel autoPlay autoPlayInterval={3000} responsive={responsive} infinite mouseTracking>
      {
        data.items.map(
          item => (
            <Box key={item.id} className={colorMode == "dark" ? "carouselItem carouselDark" : "carouselItem carouselLight" } onDragStart={handleDragStart} role="presentation">
              <Link to={`/item/${item.slug}`}>
                <Image h="300px" w="100%" borderRadius="20" src={item.image} />
                <Box p="10px">
                  <Text>{item.name}</Text>
                  <Flex justifyContent="space-between">
                    <Text>@{item.artist}</Text>
                    <Text>{item.price}N</Text>
                  </Flex>
                </Box>
              </Link>
            </Box>
          )
        )
      }
    </AliceCarousel>
  );
}

export default TopCarousel;




