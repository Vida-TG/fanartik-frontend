import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import logo from '../../assets/topaz.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from 'react'

const ItemTypes = () => {
    const [ type1, setType1 ] = React.useState(true)
    const [ type2, setType2 ] = React.useState(false)
    const [ type3, setType3 ] = React.useState(false)

    const width = window.innerWidth;
    let slidesNum;
    if (width <= 800) {
        slidesNum = 1
    } else if (width > 800 && width <= 1000) {
        slidesNum = 2
    } else if (width > 1000) {
        slidesNum = 3
    }

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
    <Box w="95%" maxW="1200px" m="10px auto" p="30px 3% 50px 3%" borderRadius="20px" background="#333">
        <Flex m="10px auto" justify="center">
            <Button m="0px 10px" onClick={type1Clicked} background={type1 ? 'var(--chakra-colors-chakra-body-bg)' : 'none'}>Painting</Button>
            <Button m="0px 10px" onClick={type2Clicked} background={type2 ? 'var(--chakra-colors-chakra-body-bg)' : 'none'}>Digital</Button>
            <Button m="0px 10px" onClick={type3Clicked} background={type3 ? 'var(--chakra-colors-chakra-body-bg)' : 'none'}>Craft</Button>
        </Flex>

        {type1 &&
        <Slider {...settings}>
            <Box className="featured-item">
                <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                    <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                    <Flex align="center">
                        <Image h="30px" w="30px" borderRadius="15" src={logo} />
                        <Flex flexDir="column" m="0px 15px">
                            <Text fontSize="12px">Harrison ONE</Text>
                            <Text fontSize="12px">@harry_wells</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
        </Slider>
        }

        {type2 &&
        <Slider {...settings}>
            <Box className="featured-item">
                <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                    <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                    <Flex align="center">
                        <Image h="30px" w="30px" borderRadius="15" src={logo} />
                        <Flex flexDir="column" m="0px 15px">
                            <Text fontSize="12px">Harrison TWO</Text>
                            <Text fontSize="12px">@harry_wells</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
        </Slider>
        }
        
        {type3 &&
        <Slider {...settings}>
            <Box className="featured-item">
                <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                    <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                    <Flex align="center">
                        <Image h="30px" w="30px" borderRadius="15" src={logo} />
                        <Flex flexDir="column" m="0px 15px">
                            <Text fontSize="12px">Harrison THREE</Text>
                            <Text fontSize="12px">@harry_wells</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="featured-item">
                    <Image h="250px" w="300px" borderTopRadius="20" src={logo} m="auto" background="transparent" />
                    <Flex w="300px" h="100px" p="10px" justify="space-around" flexDir="column" m="auto" backgroundColor="rgba(250, 250, 250, 0.05)" borderBottomRadius="20">
                        <Text textTransform="uppercase" textAlign="center">The rise of Near</Text>
                        <Flex align="center">
                            <Image h="30px" w="30px" borderRadius="15" src={logo} />
                            <Flex flexDir="column" m="0px 15px">
                                <Text fontSize="12px">Harrison Hills</Text>
                                <Text fontSize="12px">@harry_wells</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
        </Slider>
        }
    </Box>
  )
}

export default ItemTypes