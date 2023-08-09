import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text,
    Button,
    Flex,
    Stack
  } from '@chakra-ui/react';
  import {
    ChevronRightIcon,
    ChevronLeftIcon,
    Search2Icon 
} from '@chakra-ui/icons';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from '../Product/BrowseProduct.module.css';


function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };
    
    const formattedDate = new Date(dateTimeString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

const Current_Orders = () => {

    const [user, setUser] = useState(false);
    const [isProduct, setIsProduct] = useState(false);

  
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
          if (response.data.msg.orders.current.length > 0){
                setIsProduct(true)
          }
        
      } catch (error) {
          console.error(error);
          console.log(error.response.data.msg);
       
          localStorage.removeItem('tokenSmartShop');
          window.location = "/client/signin";
       
      }
    };
 
    
    useEffect(() => {
  
      fetchUserDetails();  
  
    }, []);
    return (
        
        <>
        { isProduct ?

        <div style={{marginTop: '70px', width: '90vw', marginLeft: 'calc(5vw)'}}>


       
        <Text mt={'30px'} >Following is List of your current orders</Text>
        <Text mb={'45px'}>Will be Delivered soon !</Text>
        


            <TableContainer>
                <Table variant='striped' colorScheme='facebook'>
                    <TableCaption color={'red.400'}>Curretly Users are not Allowed to cancel Orders</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th justifyContent={'center'}>Quantity</Th>
                        <Th>Cancel Order</Th>
                        <Th>Date</Th>
                        <Th>Address</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {user && user.orders.current.map((user, index) => {
                        return (
                            <Tr key={user._id}>
                            <Td>
                                <Link to={`/admin/browseproduct/product/${user.product_id}`}><Text color={'blue.400'}>{user.product_id}</Text></Link></Td>
                            <Td>{user.quantity}</Td>
                            <Td>
                            <Button bg={'blue.400'} >Cancel Order</Button>
                            </Td>
                            <Td>{formatDateTime(user.placedAt)}</Td>
                            <Td>{user.address}</Td>
                            </Tr>
                        );
                        })}

                    
                    </Tbody>
                    
                </Table>
                </TableContainer>

                


        </div>
        :
        <Flex justifyContent="center" alignItems={'center'} minHeight={'100vh'}>
            <Stack>
            <Text m={6} fontSize={'22px'} color={'pink.300'}>Looks Like you haven't ordered Anything :(</Text>
            <Link to="/"><Text color={'blue.500'}>Continue Shopping</Text></Link>
            </Stack>
        </Flex>
        }
        </>
        
    )
}

export default Current_Orders;