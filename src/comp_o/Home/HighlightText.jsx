import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

const HighlightText = () => {

  
  const [isNotSmallerScreen] = useMediaQuery("(min-width:680px)");

  return (
    <Flex w="100%" marginTop="70px" justifyContent="center">
        <Text m="25px 0px" maxWidth="800px" fontSize={ isNotSmallerScreen ? "6xl" : "4xl" } textAlign="center">Get the best 1/1 physical NFTs on FanArtiks</Text>
    </Flex>
  )
}

export default HighlightText