import React, { useState, useEffect, useRef } from 'react';
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
  Select
} from '@chakra-ui/react';
import { TriangleDownIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';

function removeRupeeSign(inputString) {
  const stringWithoutRupeeSign = inputString.replace(/₹/g, '');
  return stringWithoutRupeeSign;
}

function ConfirmOrder(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // var {
  //   title,
  //   description: initialDescription,
  //   category,
  //   price: initialPrice,
  //   available_quantity: initialAvailableQuantity,
  //   date,
  //   _id,
  //   folderName,
  //   imageName,
  //   discount: initialDiscount,
  //   editicon,
  // } = props;

  const [user, setUser] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [address, setAddress] = useState("");
  const [warning, setWarning] = useState(false);
  const isFirstRender = useRef(true);


  const placeOrder = async () => {
    try {
      const url = `http://localhost:5000/api/client/cart/move-all-to-current`;
      const res = await axios.post(url, {user_id: user._id, payment_method: paymentMethod, address: address});
      window.location.reload();
    }
      catch (error){
        if (error.response && !error.response.data.success) {
        //   setWarning(error.response.data.msg);
        console.log(error.response)
        } else if (error.message == 'Network Error'){
        //   setWarning("Server Unreachable !");
        console.log("Server Unreachable");
        }
      }
  }

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setPaymentMethod(value)
  };




  const fetchUserDetails = async () => {
    try {
        console.log("Getting user")
        const url = "http://localhost:5000/api/client/afterauth";
        const response = await axios.post(url, {
            // data
        }, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenSmartShop')}` 
            }
        });
        console.log(response.data.msg)
  
        setUser(response.data.msg);
        setAddress(response.data.msg.contact_info.address)
      
    } catch (error) {
        console.error(error);
        console.log(error.response.data.msg);
     
        localStorage.removeItem('tokenSmartShop');
        window.location = "/client/signin";
     
    }
  };

  useEffect(() => {

    let timer;
    // if (isFirstRender.current) {
    //     isFirstRender.current = false;
    //     fetchUserDetails();
    //   }

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
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '30px'}}>
        <Button
          onClick={()=>{
            onOpen();
            fetchUserDetails();
          }}
          maxW={'200px'}
          w='120px'
          flex={1}
          fontSize={'sm'}
          rounded={'sm'}
          bg={'green.600'}
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
          Place Order
        </Button>
        </div>
      

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Order Confirmation"}</ModalHeader>
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
                    <Select variant="flushed" maxW="350px" name="category" value={paymentMethod} onChange={handleSelectChange} m={'0 0 20px 30px'}>
                        <option value= 'Cash'>Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Paytm Wallet">Paytm Wallet</option> 
                    </Select>
                </InputGroup>
              <Textarea
                placeholder='Address'
                m='7px 1px'
                maxW='500px'
                name='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                h='150px'
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button bg={'green.600'} color={'white'} mr={3} onClick={placeOrder}>
              Confirm & Place Order
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmOrder;
