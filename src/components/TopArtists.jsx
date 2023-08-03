import { Box, Flex, Image, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react'
import logo from './assets/images/default.png'
import React from 'react'

import './css/topartists.css'

const TopArtists = () => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:411px)");

    return (
        <Box>
            <Text m="80px auto 20px auto" maxW="1400px">TOP ARTISTS</Text>
            <SimpleGrid p="10px" gap={5} minChildWidth={ isNotSmallerScreen ? '180px' : '90%' } m="auto" maxW="1400px">
                
                <Flex className={ isNotSmallerScreen ? 'large-screen-card' : 'small-screen-card' }>
                    <Image className={ isNotSmallerScreen ? 'large-screen-card-image' : 'small-screen-card-image' } src={logo} />
                    <Text fontSize="lg" marginY="auto">Vincent</Text>
                    <Text fontSize="sm" marginY="auto">@vincent_dray</Text>
                    <Flex className={ isNotSmallerScreen ? 'large-screen-card-sales' : 'small-screen-card-sales' } justify="space-around">
                        <Text>Total Sales:</Text>
                        <Text>$5000</Text>
                    </Flex>
                </Flex>
                <Flex className={ isNotSmallerScreen ? 'large-screen-card' : 'small-screen-card' }>
                    <Image className={ isNotSmallerScreen ? 'large-screen-card-image' : 'small-screen-card-image' } src={logo} />
                    <Text fontSize="lg" marginY="auto">Vincent</Text>
                    <Text fontSize="sm" marginY="auto">@vincent_dray</Text>
                    <Flex className={ isNotSmallerScreen ? 'large-screen-card-sales' : 'small-screen-card-sales' } justify="space-around">
                        <Text>Total Sales:</Text>
                        <Text>$5000</Text>
                    </Flex>
                </Flex>
                <Flex className={ isNotSmallerScreen ? 'large-screen-card' : 'small-screen-card' }>
                    <Image className={ isNotSmallerScreen ? 'large-screen-card-image' : 'small-screen-card-image' } src={logo} />
                    <Text fontSize="lg" marginY="auto">Vincent</Text>
                    <Text fontSize="sm" marginY="auto">@vincent_dray</Text>
                    <Flex className={ isNotSmallerScreen ? 'large-screen-card-sales' : 'small-screen-card-sales' } justify="space-around">
                        <Text>Total Sales:</Text>
                        <Text>$5000</Text>
                    </Flex>
                </Flex>
                <Flex className={ isNotSmallerScreen ? 'large-screen-card' : 'small-screen-card' }>
                    <Image className={ isNotSmallerScreen ? 'large-screen-card-image' : 'small-screen-card-image' } src={logo} />
                    <Text fontSize="lg" marginY="auto">Vincent</Text>
                    <Text fontSize="sm" marginY="auto">@vincent_dray</Text>
                    <Flex className={ isNotSmallerScreen ? 'large-screen-card-sales' : 'small-screen-card-sales' } justify="space-around">
                        <Text>Total Sales:</Text>
                        <Text>$5000</Text>
                    </Flex>
                </Flex>
                <Flex className={ isNotSmallerScreen ? 'large-screen-card' : 'small-screen-card' }>
                    <Image className={ isNotSmallerScreen ? 'large-screen-card-image' : 'small-screen-card-image' } src={logo} />
                    <Text fontSize="lg" marginY="auto">Vincent</Text>
                    <Text fontSize="sm" marginY="auto">@vincent_dray</Text>
                    <Flex className={ isNotSmallerScreen ? 'large-screen-card-sales' : 'small-screen-card-sales' } justify="space-around">
                        <Text>Total Sales:</Text>
                        <Text>$5000</Text>
                    </Flex>
                </Flex>
            </SimpleGrid>
        </Box>
    )
}

export default TopArtists