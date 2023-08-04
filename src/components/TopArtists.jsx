import { Avatar, Box, Flex, Image, SimpleGrid, Skeleton, Text, useMediaQuery } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './css/topartists.css'
import { Link } from 'react-router-dom';

const TopArtists = () => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:411px)");
    const [topCreators, setTopCreators] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchTopCreators = async () => {
          try {
            const response = await axios.get('https://fanartiks.onrender.com/api/users/top-creators');
            setTopCreators(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching top creators:', error);
          }
        };
    
        fetchTopCreators();
      }, []);
    
    
    return (
        <Box>
            <Text m="80px auto 20px auto" maxW="1400px">TOP ARTISTS</Text>
            { loading &&
                (<SimpleGrid p="10px" gap={5} minChildWidth={ isNotSmallerScreen ? '180px' : '90%' } m="auto" maxW="1400px">
                    <Skeleton h='200' />
                    <Skeleton h='200' />
                    <Skeleton h='200' />
                    <Skeleton h='200' />
                    <Skeleton h='200' />
                </SimpleGrid>)
            }
            { !loading && (
                <SimpleGrid p="10px" gap={5} minChildWidth={ isNotSmallerScreen ? '180px' : '90%' } m="auto" maxW="1400px">
                    {topCreators.map((creator) => (
                    <Link key={creator._id} to={`/creator/profile/${creator._id}`}>
                        <Flex className={ isNotSmallerScreen ? 'large-screen-card' : 'small-screen-card' }>
                            <Avatar size={ isNotSmallerScreen ? 'xl' : 'md'} className={ isNotSmallerScreen ? 'large-screen-card-image' : 'small-screen-card-image' } src={creator.image} name={creator.name} />
                            { isNotSmallerScreen && <Text fontSize="lg" marginY="auto">{creator.name}</Text> }
                            <Text fontSize="sm" marginY="auto" fontStyle='italic'>@{creator.username}</Text>
                            <Flex className={ isNotSmallerScreen ? 'large-screen-card-sales' : 'small-screen-card-sales' } justify="space-around">
                                <Text>Artworks:</Text>
                                <Text>{creator.artCount}</Text>
                            </Flex>
                        </Flex>
                    </Link>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    )
}

export default TopArtists