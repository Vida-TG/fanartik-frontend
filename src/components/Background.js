import React from 'react'
//import background2 from '../../assets/stars-bg.jpg'
import lbackground from './assets/dark-bg.jpg'
import { Image, useColorMode } from '@chakra-ui/react'

const Background = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <Image src={lbackground} opacity={colorMode == "dark" ? "0.06" : "0.02"} position="absolute" top="0px" h="100vh" w="100vw" zIndex="-1"/>
    )
}

export default Background