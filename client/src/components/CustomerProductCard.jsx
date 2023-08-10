'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';
import Carousel from './Carousel';
import {Link} from 'react-router-dom';
import Rating from './RatingComponent';



export default function CustomerProductCard(props) {
    const { title, description, category, price, available_quantity, date, _id, folderName, imageName, discount, brand, originalPrice, rating } = props;
    const truncatedDescription = description.length > 70 ? description.slice(0, 70) + '...' : description;
    const truncatedTitle = title.length > 30 ? title.slice(0, 30) + '...' : title;
    const quantity = `Quantity : ${available_quantity}`;
    const formattedDate = new Date(date).toLocaleDateString();
  return (
    <Center py={12} zIndex={0}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        m={5}>
      
        {/* <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
            alt="#"
          />
        </Box> */}
        <Carousel folderName={folderName} imageName={imageName}/>
        <Link to={`/admin/browseproduct/product/${_id}`}>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {brand}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} h={'70px'}>
            {truncatedTitle}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {price}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
                {originalPrice}
            </Text>
            
          </Stack>
          {
            
          }
          {
            rating ?
            <Rating rating = {rating}/>
            :
            <Rating rating={0}></Rating>


          }
          
        </Stack>
        </Link>
      </Box>
      
    </Center>
  )
}