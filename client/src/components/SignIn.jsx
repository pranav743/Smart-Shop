'use client';

import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

export default function SimpleCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      var details = {
        email: email,
        password: password
      }

      const url = "http://localhost:5000/api/client/userauth"
      const res = await axios.post(url, details) ;
      // console.log(res);
      localStorage.setItem("tokenSmartShop", res.data.token);
      setEmail("");
      setPassword("");
      window.location = "/";
      
  } catch (error) {

      // if (error.response) {

      //     // console.log(error.response.data.msg);
      //     setoccuredError(true);
      //     seterrorMessage(error.response.data.msg);

      //     setTimeout(() => {
      //         setoccuredError(false);
      //         seterrorMessage("");
      //       }, 5000); // Reset after 3 seconds (3000 milliseconds)
      //   }
      //   if (error.message == 'Network Error'){

      //     setoccuredError(true);
      //     seterrorMessage("Servers Unreachable!");

      //     setTimeout(() => {
      //         setoccuredError(false);
      //         seterrorMessage("");
      //       }, 5000); 
          
      // }
      console.log(`Error: ${error.message}`);
      
  }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          as="form"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={handlePasswordChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'pink.400'}>Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                bg={'pink.400'}
                color={'white'}
                _hover={{
                  bg: 'pink.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
