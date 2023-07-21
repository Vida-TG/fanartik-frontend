import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa"

import React from 'react'

const ToggleMode = () => {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <IconButton className="spacing" icon={colorMode == 'dark' ? <FaSun /> : <FaMoon/>} onClick={toggleColorMode}/>
  )
}

export default ToggleMode