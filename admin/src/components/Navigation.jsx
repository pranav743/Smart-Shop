import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

import { useDisclosure, Button, Input } from '@chakra-ui/react';
import React from 'react';
import { Container } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'

import { useNavigate } from 'react-router-dom';





function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef();
  const navigate = useNavigate();

  return (
    <>
     
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen} style={{position: 'absolute', right: '10px', top: '7px', backgroundColor: '#0081fa'}}>
        <ArrowLeftIcon color='#fff'/>
      </Button>
      
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Options</DrawerHeader>

          <DrawerBody>
            
            <Container centerContent={true} style={{margin: '10px 0 10px 0', cursor: 'pointer'}} onClick={() => {
              navigate('/');
              onClose();
            }
              }>
             Home
            </Container>
            <Container centerContent={true} style={{margin: '10px 0 10px 0', cursor: 'pointer'}} onClick={() => {
              navigate('/admin/addproduct');
              onClose();
            }
              }>
             Add Product
            </Container>
            <Container centerContent={true} style={{margin: '10px 0 10px 0', cursor: 'pointer'}} onClick={() => {
              navigate('/admin/browseproduct');
              onClose();
            }
              }>
             Browse Product
            </Container>
            
           
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerExample;