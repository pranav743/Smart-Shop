import React, {useEffect, useState} from 'react';
import { Stack, Text, Button, Container, Flex } from '@chakra-ui/react';
import CartItem from './CartItem';
import axios from 'axios';
import ConfirmOrder from './ConfirmOrder';
import { server } from '../utils';


export default function Cart() {

    const [URL, setURL] = useState(server + "admin/products?_id=");
    const [user, setUser] = useState(false);
    const [products, setProducts] = useState(false);

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
            setUser(user);
            var arr = user.orders.cart;
            console.log(arr);
            getProductsinCart(arr);
    
        } catch (error) {
            console.error(error);
            console.log(error.response.data.msg);
            localStorage.removeItem('tokenSmartShop');
            window.location = "/client/signin";  
        }
      };

      const getProductsinCart = async (arr) => {
      
        try {
          
         
          const encodedIds = arr.map((obj) => encodeURIComponent(obj.product_id)).join(',');
          const url = server + `admin/products/cartitems?_id=${encodedIds}`;
          const res = await axios.get(url);
          var results = (res.data.data); 
          setProducts(results);
          
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



      useEffect(() => {
        fetchUserDetails();
      }, []);
    

  
  return (
    <Flex align="center" justify="center" h="auto">
        
    <Container maxW='container.sm' m={'70px 0 75px 0'}>
        <Text fontSize={'25px'} color={'pink.500'} fontWeight={'bold'} letterSpacing={'2px'} m={5}>Your Cart</Text>
        <Stack>
           
        {products ?
            products.map((item, index) => {
                const cartItem = user.orders.cart.find((cartItem) => cartItem.product_id.toLowerCase() === item._id.toLowerCase());
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                <div key={index}>
                    <CartItem key={index} product={item} quantity={quantity} user_id={user._id}/>
                </div>
                );
            }) :
            <><Stack>

                <Text>You Don't Have anything inside your Cart</Text>
                <Text> Keep Shopping :)</Text>
                
            </Stack></>
            }

            

        </Stack>
    </Container>
    { products &&
    <div style={{position: 'fixed', bottom: '0px', height: '60px', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 0 5px #777'}}>
        {/* <Button onClick={placeOrder}
                style={{position: 'absolute', right: '15px', top: '10px'}}
                type="submit"
                bg={'pink.400'}
                color={'white'}
                _hover={{
                  bg: 'pink.500',
                }}>
                Place Order
              </Button> */}
              <ConfirmOrder/>
        </div>
    }
    </Flex>
  )
}