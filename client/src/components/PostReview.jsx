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
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { server } from '../utils';


function PostReview(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    var {
        product_id
      } = props;
    const [comment, setcomment] = useState("");

    const [user, setUser] = useState(false);
    const [rating, setRating] = useState(5);

    const handleClick = (selectedRating) => {
        setRating(selectedRating);
        console.log(selectedRating)
    };


    const fetchUserDetails = async () => {
    try {
        const url = server + "client/afterauth";
        const response = await axios.post(url, {
            // data
        }, {
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('tokenSmartShop')}` 
            }
        });
  
        const user = response.data.msg;
        // console.log(user)
        setUser(user);
      
    } catch (error) {
        console.error(error);
        console.log(error.response.data.msg);
        localStorage.removeItem('tokenSmartShop');
        window.location = "/client/signin";
     
    }
    };

    
  
  


    const addReview = async () => {
        try {
        const url = server + `client/review/add`;
        const res = await axios.post(url, {username: user.name, product_id: product_id, rating: rating, comment: comment, user_id: user._id});
        // console.log(res)
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

  return (
    <>
       
        <Button
          onClick={()=>{
            
            fetchUserDetails();
            onOpen();

          }}
          maxW={'200px'}
          w='120px'
          flex={1}
          fontSize={'sm'}
          rounded={'sm'}
          bg={'pink.400'}
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
          Review
        </Button>
    
      

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        { user &&

        <ModalContent>
          <ModalHeader>{"Review Product"}</ModalHeader>
          <ModalCloseButton />

      

          <ModalBody pb={6}>
            <Stack>
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0 15px 5px' }}>
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    
                    return (
                    <span
                        key={starValue}
                        onClick={() => handleClick(starValue)}
                        style={{ cursor: 'pointer' }}
                    >
                        <FaStar
                        className="star-icon filled"
                        color={starValue <= rating ? '#edda09' : 'lightgray'}
                        />
                    </span>
                    );
                })}
                </div>
           
              <Textarea
                placeholder='comment'
                m='7px 1px'
                maxW='500px'
                name='comment'
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                h='150px'
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button bg={'green.600'} color={'white'} mr={3} onClick={addReview}>
              Post Review
            </Button>
            
          </ModalFooter>
        </ModalContent>

        }

      </Modal>
    </>
  );
}

export default PostReview;
