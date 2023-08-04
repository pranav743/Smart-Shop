import React, {useState} from 'react'

import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
  import Carousel from '../../components/Carousel';
  import EditMenu from '../../components/EditProduct';
  
  export default function SocialProfileSimple(props) {

    const { title, description, category, price, available_quantity, date, _id, folderName, imageName, discount } = props;
    const truncatedDescription = description.length > 70 ? description.slice(0, 70) + '...' : description;
    const quantity = `Quantity : ${available_quantity}`;
    const formattedDate = new Date(date).toLocaleDateString();


    return (
      <Center py={6} style={{minHeight: '600px'}}>
        <Box style={{minHeight: '500px'}}
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          m={3}

          >
          <div style={{height: '200px', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '7px'}}>
          <Carousel folderName={folderName} imageName={imageName}/>
          </div>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {title}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {category}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            {truncatedDescription}
            <Link href={'#'} color={'blue.400'}>
              #Link to Product
            </Link>{' '}
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {quantity}
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {formattedDate}
            </Badge>
            {/* <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #music
            </Badge> */}
          </Stack>
  
          <Stack mt={8} direction={'row'} spacing={4}>
            <span style={{width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{price}</span>
            <EditMenu folderName={folderName} imageName={imageName} title= {title} description = {description}  category = {category} price = {price} available_quantity = {available_quantity} date = {date} _id={_id} key={_id} discount={discount}>
          Edit
        </EditMenu>
          </Stack>
          
        </Box>
      </Center>
    );
  }