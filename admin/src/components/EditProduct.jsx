import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Alert,
  AlertIcon,
  Textarea,
  InputLeftAddon,
} from '@chakra-ui/react';
import { TriangleDownIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';

function removeRupeeSign(inputString) {
  const stringWithoutRupeeSign = inputString.replace(/₹/g, '');
  return stringWithoutRupeeSign;
}

function EditMenu(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  var {
    title,
    description: initialDescription,
    category,
    price: initialPrice,
    available_quantity: initialAvailableQuantity,
    date,
    _id,
    folderName,
    imageName,
    discount: initialDiscount,
    editicon,
  } = props;

  const [price, setPrice] = useState(parseInt(parseInt(removeRupeeSign(initialPrice)) * (100 / (100 - parseInt(initialDiscount))))+1);
  const [discount, setDiscount] = useState(initialDiscount);
  const [availableQuantity, setAvailableQuantity] = useState(initialAvailableQuantity);
  const [description, setDescription] = useState(initialDescription);
  const [warning, setWarning] = useState('Be careful while editing');
  const [URL, setURL] = useState('http://localhost:5000/api/admin');




  const DeleteProduct = async () => {
    try {
      const url = URL + `/listproduct/delete/${_id}`;
      const res = await axios.delete(url);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setWarning(error.response.data.msg);
      } else if (error.message === 'Network Error') {
        setWarning('Server Unreachable !');
      }
    }
  };

  const UpdateProduct = async () => {
    try {
      const url = URL + `/products/update`;
      const res = await axios.put(url, {
        _id: _id,
        available_quantity: availableQuantity,
        description: description,
        discount: discount,
        actual_price: price
      });
      onClose();
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setWarning(error.response.data.msg);
      } else if (error.message === 'Network Error') {
        setWarning('Server Unreachable !');
      }
    }
  };

  useEffect(() => {
    let timer;

    if (warning) {
      timer = setTimeout(() => {
        setWarning(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [warning]);

  return (
    <>
      {editicon ? (
        <EditIcon onClick={onOpen} m='0 0 0 15px' cursor={'pointer'} />
      ) : (
        <Button
          onClick={onOpen}
          w='120px'
          flex={1}
          fontSize={'sm'}
          rounded={'sm'}
          bg={'blackAlpha.600'}
          color={'white'}
          boxShadow={'0px 0px 5px -5px rgb(0 0 0 / 48%), 0 0px 5px -5px rgb(0 0 0 / 43%)'}
          _hover={{
            bg: 'gray.200',
            color: 'black',
          }}
          _focus={{
            bg: 'black.500',
          }}
        >
          Edit
        </Button>
      )}

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          {warning && (
            <Alert status='error' style={{ height: '40px', zIndex: '2' }}>
              <AlertIcon />
              {warning}
            </Alert>
          )}

          <ModalBody pb={6}>
            <Stack>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>₹</InputLeftElement>
                <Input
                  placeholder='Price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <TriangleDownIcon color={'red'} />
                </InputLeftElement>
                <Input
                  type='number'
                  placeholder='Discount'
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Qty.' />
                <Input
                  type='number'
                  placeholder='Available Quantity'
                  value={availableQuantity}
                  onChange={(e) => setAvailableQuantity(e.target.value)}
                />
              </InputGroup>
              <Textarea
                placeholder='Description'
                m='7px 1px'
                maxW='500px'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                h='150px'
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button bg={'green.600'} color={'white'} mr={3} onClick={UpdateProduct}>
              Save
            </Button>
            <Button onClick={DeleteProduct} color={'red.300'}>
              Delete Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditMenu;
