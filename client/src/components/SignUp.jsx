import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async () => {
    

    try {

        var user = {
          name: name,
          email: email,
          password: password,
          contact_info: {
            phone_no: phone,
            address: address
          }
        };

        const url = "http://localhost:5000/api/client/registeruser"
        const res = await axios.post(url, user) ;
      
        localStorage.setItem("user_details", JSON.stringify({name: name, email: email}));
        generateotp();
        window.location = '/client/otpvalidation';
        // window.location = '/signin';
    
        
        
    } catch (error) {

        // if (error.response && error.response.status >= 400 && error.response.status<=500){
        //     setoccuredError(error.response.data.message);
        //     setoccuredError(true);
        //     seterrorMessage(error.response.data.msg);

        //     setTimeout(() => {
        //         setoccuredError(false);
        //         seterrorMessage("");
        //       }, 5000); 
        // }

        console.log(`Error: ${error.message}`);
        // if (error.message == 'Network Error'){
        //     setoccuredError(true);
        //     seterrorMessage("No Internet !");
        //     setTimeout(() => {
        //         setoccuredError(false);
        //         seterrorMessage("");
        //       }, 5000);    
        // }
    }


  };

  const generateotp = async (e) => {
    try {
        var details = {
          email: email
        }
        const url = "http://localhost:5000/api/client/generateotp"
        const res = await axios.put(url, details);
        console.log(res);
        
        
    } catch (error) {

        if (error.response) {
            console.log(error.response.data);       
        }      
        console.log(`Error: ${error.message}`);
        
    }
}


  return (
    <Flex
      m={'60px 0 0 0'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => handleInputChange(e, setName)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="phone">
                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleInputChange(e, setPhone)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={address}
                onChange={(e) => handleInputChange(e, setAddress)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'pink.400'}
                color={'white'}
                _hover={{
                  bg: 'pink.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link to={'/client/signin'} style={{ color: 'pink' }}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
