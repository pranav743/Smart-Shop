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
    Skeleton, SkeletonCircle, SkeletonText
  } from '@chakra-ui/react';
  import {
    ChevronRightIcon,
    ChevronLeftIcon,
    Search2Icon 
} from '@chakra-ui/icons';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import styles from '../Product/BrowseProduct.module.css';

const OrderRow = (props) => {

    var {product_id, user_id, date, quantity, address, price, title, discount, payment_method} = props;
    const [details, setDetails] =  useState(false);
    const isFirstRender = useRef(true);
    const [URL, setURL] = useState("http://localhost:5000/api/admin/products?_id=");
    // URL2 = "http://localhost:5000/api/admin/products//get-products-by-ids"

    

 
    const setOrderStatus = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/client/cart/move-to-history', { user_id: user_id, product_id: product_id, amount: (parseInt(parseInt(price) * (1-parseInt(discount)/100)) ) * quantity });
        const products = response.data.data;
        console.log(response.data)
        window.location.reload();
      
      } catch (error) {
        console.log("Error");
      }
    }




    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            // getAllusers();
          }
      }, []);

      return (
<>
        {
            details ? <Skeleton height='40px' width={'100vw'} m={3}/>:
            

            <>
                <Tr>
                        <Td minWidth={'150px'} maxWidth={'150px'} whiteSpace="normal">{title}</Td>
                        <Td>{quantity}</Td>
                        <Td minWidth={'250px'} maxWidth={'250px'} whiteSpace={"normal"}>{address}</Td>
                        <Td isNumeric fontWeight={'bold'}>{
                            (parseInt(parseInt(price) * (1-parseInt(discount)/100)) ) * quantity
                        }</Td>
                        <Td minWidth={'100px'} maxWidth={'100px'} whiteSpace={'normal'} isNumeric color={'gray.600'}>{payment_method}</Td>
                        <Td minWidth={'120px'} maxWidth={'120px'} whiteSpace={'normal'}>{date}</Td>
                        <Td><Button
                        onClick={setOrderStatus}
                        maxW={'200px'}
                        w='120px'
                        flex={1}
                        fontSize={'sm'}
                        rounded={'sm'}
                        bg={'green.500'}
                        color={'white'}
                        boxShadow={'0px 0px 5px -5px rgb(0 0 0 / 48%), 0 0px 5px -5px rgb(0 0 0 / 43%)'}
                        _hover={{
                          bg: 'gray.200',
                          color: 'black',
                        }}
                        _focus={{
                          bg: 'black.500',

                        }}>Complete</Button></Td>
                        <Td color={'blue.300'}>{user_id}</Td>
                </Tr>
            </>
            
            

        }

        
</>
      );
    
}

export default OrderRow;