import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/carousel1.css'
import { Link } from 'react-router-dom'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Box, Flex, Image, Skeleton, Text, useColorMode } from '@chakra-ui/react';

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
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/arts/recent-artworks');
        setArtworks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <>
    { loading &&
      <Skeleton h='400' w='100%' mb="100px"/>
    }
    { !loading &&
    <AliceCarousel autoPlay autoPlayInterval={3000} responsive={responsive} infinite mouseTracking>
      {
        artworks.map((artwork) => (
            <Box key={artwork._id} className={colorMode == "dark" ? "carouselItem carouselDark" : "carouselItem carouselLight" } onDragStart={handleDragStart} role="presentation">
              <Link to={`/art/${artwork.slug}`}>
                <Image h="300px" w="100%" borderRadius="20" src={artwork.image} />
                <Box p="10px">
                  <Text>{artwork.name}</Text>
                  <Flex justifyContent="space-between">
                    <Text>@{artwork.creator}</Text>
                    <Text>{artwork.price}$</Text>
                  </Flex>
                </Box>
              </Link>
            </Box>
          )
        )
      }
    </AliceCarousel>
  }
  </>
)}


export default TopCarousel;




