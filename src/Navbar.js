import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaOpencart, FaStream } from 'react-icons/fa'
import './css/navbar.css'

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import SearchBox from './components/SearchBox';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { getError } from './utils';
import { Store } from './Store';
import ToggleMode from './ToggleMode';




const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [isNotSmallerScreen] = useMediaQuery("(min-width:800px)");
  const [ loading, setLoading ] = useState(false)
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  


  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  
    const requestHandler = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`https://fanartiks.onrender.com/api/requests`, {}, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            toast.success(response.message);
            setLoading(false);
        } catch (err) {
            toast.error(getError(err));
            setLoading(false)
        }
    }


  return (
    
    <Flex justifyContent="center" zIndex="10" position="fixed" top="0px" w="100vw" background="var(--chakra-colors-chakra-body-bg)" borderBottom="0.2px solid var(--chakra-colors-chakra-border-color)">
        { isNotSmallerScreen ?
        <Flex w="100vw" maxW="2000px" p="15px" h="70px" justifyContent="space-between" alignItems="center">
            <Link to='/' className="spacing">FANARTIKS</Link>
            <Spacer></Spacer>
            <SearchBox />
            <Spacer></Spacer>
            <Link className="spacing" to="/">Explore</Link>
            <Link className="spacing" to="/creators">Artists</Link>
            
            {userInfo ? (
            <Menu p="0px 25px" className="spacing">
                <MenuButton className="spacing">{userInfo.name}</MenuButton>
                <MenuList>
                    <Link to="/profile">
                        <MenuItem>User Profile</MenuItem>
                    </Link>
                    <Link to="/orderhistory">
                        <MenuItem>Order History</MenuItem>
                    </Link>
                    { loading && !userInfo.isCreator && (
                        <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>
                    )}
                    { !loading && !userInfo.isCreator && (
                        <Link to="#creator" onClick={requestHandler}>
                            <MenuItem>Become a Creator</MenuItem>
                        </Link>
                    )}
                    <Link to="#signout" onClick={signoutHandler}>
                        <MenuItem>Sign Out</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
            ):
            (
                <Link p="0px 25px" className="spacing" to="/signin">
                  Login
                </Link>
            )}
            {userInfo && userInfo.isCreator && (
            <Menu p="0px 25px">
                <MenuButton className="spacing">Creator</MenuButton>
                <MenuList>
                    <Link to="/creator/art/create">
                        <MenuItem>Create Artwork</MenuItem>
                    </Link>
                    <Link to="/creator/bookings">
                        <MenuItem>Get bookings</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
            )}
            {userInfo && userInfo.isAdmin && (
            <Menu p="0px 25px">
                <MenuButton className="spacing">Admin</MenuButton>
                <MenuList>
                    <Link to="/admin/dashboard">
                        <MenuItem>Dashboard</MenuItem>
                    </Link>
                    <Link to="/admin/arts">
                        <MenuItem>Arts</MenuItem>
                    </Link>
                    <Link to="/admin/orders">
                        <MenuItem>Orders</MenuItem>
                    </Link>
                    <Link to="/admin/users">
                        <MenuItem>Users</MenuItem>
                    </Link>
                    <Link to="/admin/requests">
                        <MenuItem>Creator requests</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
            )}

            <ToggleMode h="40px" w="40px" />
            <Link to="/cart">
                <Flex p="0px 10px" style={{position: "relative"}}>
                    <IconButton icon={<FaOpencart />} />
                    {cart.cartItems.length > 0 && (
                        <Flex background="#ff2e2e" h="26px" w="26px" paddingTop="13px" borderRadius="13px" align="center" justify="center" style={{position: "relative", left: "-20px", top: "-10px"}}>
                            <Text>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Text>
                        </Flex>
                    )}
                </Flex>
            </Link>
        </Flex>
        :
        <Flex>
            <Flex h="70px" w="100vw" maxWidth="100vw" p="10px" justifyContent="space-between" alignItems="center" position="relative">
                <Link to='/' className='spacing'>FANARTIKS</Link>
                <SearchBox />
                <Link to="/cart" className='spacing'>
                    <Flex p="0px 10px" style={{position: "relative"}}>
                        <IconButton icon={<FaOpencart />} />
                        {cart.cartItems.length > 0 && (
                            <Flex background="#ff2e2e" h="26px" w="26px" paddingTop="13px" borderRadius="13px" align="center" justify="center" style={{position: "relative", left: "-20px", top: "-10px"}}>
                                <Text>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Text>
                            </Flex>
                        )}
                    </Flex>
                </Link>
                <Box ref={btnRef} onClick={onOpen} position="relative" left="-10px">
                    <FaStream className='hamburger'/>
                </Box>
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement='bottom'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <ToggleMode h="40px" w="40px" />
                        {userInfo && userInfo.isCreator && (
                        <Menu p="0px 25px">
                            <MenuButton className="spacing"><Button>Creator</Button></MenuButton>
                            <MenuList>
                                <Link to="/creator/art/create">
                                    <MenuItem>Create Artwork</MenuItem>
                                </Link>
                                <Link to="/creator/bookings">
                                    <MenuItem>Get bookings</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                        )}
                        {userInfo && userInfo.isAdmin && (
                        <Menu p="0px 25px">
                            <MenuButton className="spacing"><Button>Admin</Button></MenuButton>
                            <MenuList>
                                <Link to="/admin/dashboard">
                                    <MenuItem>Dashboard</MenuItem>
                                </Link>
                                <Link to="/admin/arts">
                                    <MenuItem>Arts</MenuItem>
                                </Link>
                                <Link to="/admin/orders">
                                    <MenuItem>Orders</MenuItem>
                                </Link>
                                <Link to="/admin/users">
                                    <MenuItem>Users</MenuItem>
                                </Link>
                                <Link to="/admin/requests">
                                    <MenuItem>Creator requests</MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                        )}
                    </DrawerHeader>

                    <DrawerBody>
                        <Link className="mobile-link" to="/">Explore</Link>
                        <Link className="mobile-link" to="/creators">Artists</Link>
                        {userInfo ? (
                            <>
                                <Link className="mobile-link" to="/profile">Profile</Link>
                                <Link className="mobile-link" to="/orderhistory">Order History</Link>
                                { loading && !userInfo.isCreator && (
                                    <Flex w="100%" align="center" justify="center"><LoadingBox></LoadingBox></Flex>
                                )}
                                { !loading && !userInfo.isCreator && (
                                    <Link className="mobile-link" to="#creator" onClick={requestHandler}>
                                        Become a Creator
                                    </Link>
                                )}
                                <Link className="mobile-link" to="#signout" onClick={signoutHandler}>Sign out</Link>
                            </>
                        ) : (
                            <Link className="mobile-link" to="/signin">
                                Sign in
                            </Link>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
        }
    </Flex>
  )
}

export default Navbar;