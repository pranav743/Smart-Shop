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
    Stack,

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
import PostReview from '../../components/PostReview';
import { server } from '../../utils';


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

const History_Orders = () => {

    const [user, setUser] = useState(false);
    const [isProduct, setIsProduct] = useState(false);

  
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
          if (response.data.msg.orders.history.length > 0){
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


       
        <Text mt={'30px'} mb={'45px'} >Delivered orders will Appear Here</Text>
     
        


            <TableContainer>
                <Table variant='striped' colorScheme='facebook'>
                    <TableCaption color={'red.400'}>You are Allowed to review a product Only Once</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th justifyContent={'center'} isNumeric>Quantity</Th>
                        <Th isNumeric>Amount Paid</Th>
                        <Th>Date</Th>
                        <Th>Address</Th>
                        <Th isNumeric>Review</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {user && user.orders.history.map((user, index) => {
                        return (
                            <Tr key={user._id}>
                            <Td minWidth={'90px'} maxWidth={'90px'} whiteSpace={"normal"}>
                                <Link to={`/admin/browseproduct/product/${user.product_id}`}><Text color={'blue.400'}>{"Link"}</Text></Link></Td>
                            <Td isNumeric>{user.quantity}</Td>
                            <Td isNumeric fontWeight={'bold'}>
                            ₹ {user.amount}
                            </Td>
                            <Td minWidth={'120px'} maxWidth={'120px'} whiteSpace={"normal"}>{formatDateTime(user.completedAt)}</Td>
                            <Td minWidth={'200px'} maxWidth={'200px'} whiteSpace={"normal"}>{user.address}</Td>
                            <Td isNumeric>{ user.isReviewed ?
                                <Text>Reviewed</Text> :
                                <PostReview product_id={user.product_id}/>
                            }</Td>
                           
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
            <Text m={6} fontSize={'22px'} color={'pink.300'}>Looks Like you haven't ordered Anything or Your Orders Might be on the Way</Text>
            <Link to="/"><Text color={'blue.500'}>Continue Shopping</Text></Link>
            </Stack>
        </Flex>
        }
        </>
        
    )
}

export default History_Orders;