'use client'

import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  useColorModeValue,
  List,
  ListItem,
  Grid,
  GridItem,
  Divider,
  Spinner,
  Center,
  useToast
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import BigCarousel from '../../components/BigCarousel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import showToast from '../../components/Toast';
import Rating from '../../components/RatingComponent';




export default function ProductPage(props) {


    const toast = useToast();

    const btnbg = useColorModeValue('gray.900', 'gray.50');
    const [user, setUser] = useState();
    const { product_id } = useParams();

    const [URL, setURL] = useState("http://localhost:5000/api/admin/products?_id=");
    const [product, setProduct] = useState(false);

    const getSearchResults = async () => {
        
        try {
          
          const url = URL + product_id
          const res = await axios.get(url);
          var results = res.data; 
          // console.log(results.data[0])
          setProduct(results.data[0])
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

    const addToCart = () => {
      if (localStorage.getItem("tokenSmartShop")){
        add();
      }
      else{
        const newTab = window.open('/client/signin', '_blank');
        newTab.focus();
      }
    }

    const fetchUserDetails = async () => {
      try {
          const url = "http://localhost:5000/api/client/afterauth";
          const response = await axios.post(url, {
              // data
          }, {
              headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenSmartShop')}` 
              }
          });
    
          const user = response.data.msg;
          setUser(user);
        
      } catch (error) {
          console.error(error);
          console.log(error.response.data.msg);
          localStorage.removeItem('tokenSmartShop');
          window.location = "/client/signin";
       
      }
    };

    const add = async () =>{
      try {
        const url = "http://localhost:5000/api/client/cart/add";
        const response = await axios.post(url, {
            email: user.email,
            _id: user._id,
            product_id: product_id
        });
        showToast(toast, "Added to Cart", 'success', "Product has been added to your cart Successfully !")
    
    } catch (error) {
      if ((error.response.data.msg) == "The Product is currently Out of Stock"){
        showToast(toast, "Error", 'error', "The Product is currently Out of Stock")
      } else{
        showToast(toast, "Error", 'error', "Failed to add product to the Cart")
      }
        
    }
    }

    useEffect(() => {

        getSearchResults();
        if (localStorage.getItem("tokenSmartShop")){
          fetchUserDetails();
        }
        
      }, []);



return (

   <>
    { product ?
    <> 
    <Grid padding={6} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 2fr)' }} gap={4} m={'60px 0 0 0'}>
      <GridItem bg="red.200">
      <Flex>
          <BigCarousel folderName={product.slug} imageName={product.details.imgs} />
        </Flex>
      </GridItem>
      <GridItem bg="white.200">
      <Stack spacing={{ base: 6, md: 10 }} m={'15px 0 25px 0'}>
           <Box as={'header'}>
             <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {product.title}
            </Heading>
            <Text
              color={'gray.400'}
              fontWeight={300}
              fontSize={'2xl'}>
              {product.details.brand}
            </Text>
          </Box>
          </Stack>
          <Divider/>
            <Text m={6} align={'left'}
                color={'gray.400'}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {product.category.broad_category} - {product.category.sub_category}
            </Text>
          <Divider />
          <Stack direction={'row'} align={'center'} m={6}>
            <Text fontWeight={800} fontSize={'xl'}>
            ₹ {parseInt(parseInt(product.price.actual_price) * (1 - parseInt(product.price.discount)/100))+1}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
                {product.price.actual_price}
            </Text>
          </Stack>
          <Divider/>
          <Box m={6}>
               <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={'yellow.300'}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Brand:
                  </Text>{' '}
                  {product.details.brand}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Material:
                  </Text>{' '}
                  {product.details.material}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Counry of Origin:
                  </Text>{' '}
                  {product.details.country_of_origin}
                </ListItem>
                </List>
        </Box>
        <Divider/>
      </GridItem>

      
      <Stack>
      <Button onClick={addToCart}
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={btnbg}
            color={'white'}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
          </Stack>


          <Stack m={6}>
          <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={'yellow.300'}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Description: 
              </Text>
          <Text fontSize={'lg'}>
                 {product.details.description}
               </Text>
          </Stack>


    </Grid> 
    
    <div style={{padding: '10px'}}><Stack m={'20px 10px 25px 10px'}>
    <Divider/>
      
      <Text fontSize={'22px'}>Overall Rating</Text>
      {
        product.details.avgRating ? <Flex justifyContent={'center'} width={'100%'} padding={6}>

          <Stack>
          
          <Text fontSize={'30px'} fontWeight={'bold'}>{product.details.avgRating}/5</Text>
          <Rating rating={product.details.avgRating}></Rating>

          </Stack>
          
          </Flex> :
        <Text>No One Rated this Product</Text>
      }

      <Divider/>

      <Text textAlign={'left'} fontSize={'21px'} m={5}>Reviews</Text>
      {
        product.reviews.length > 0 ? 

        product.reviews.map((review, index) => (
          <Stack m={'10px 2vw'} padding={'10px'}>
            <Divider m={'10px'}/>
            <Rating rating={review.rating}/>
              <Text textAlign={'left'} fontSize={'18px'}>{review.reviewer}</Text>
  
              <p style={{height: 'auto', padding: '10px 10px 10px 0', textAlign: 'left', fontSize: '15px' }}>{review.comment}</p>
          </Stack>
        ))

        :

        <Text>No One has Reviewed This Product</Text>
        
      }
      
      </Stack></div>
    </>
    :
    <Center height="100vh">
    <Spinner size="xl" />
    </Center>
    
    }
    
    </>
  );
}