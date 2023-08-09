
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Text, Table, TableCaption, Thead, Tbody, Tr, Th, Td, TableContainer, Skeleton } from '@chakra-ui/react';
import OrderRow from './OrderRow';



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

const Orders_page = () => {
  const [orders, setOrders] = useState([]);
  const [productData, setProductData] = useState({}); // Store product data here
  const [fetchedProductTitles, setFetchedProductTitles] = useState(false);
  const isFirstRender = useRef(true);
  const [URL, setURL] = useState("http://localhost:5000/api/client/cart/current-orders");

  const getOrdersData = async () => {
    try {
      const url = URL;
      const res = await axios.get(url);
      setOrders(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      // Handle errors
    }
  };

  const fetchProductTitles = async () => {
    const productIds = orders.map(order => order.product_id);
  
    try {
      const response = await axios.post('http://localhost:5000/api/admin/products/get-products-by-ids', { productIds });
      const products = response.data.data;
  
      const productMap = {};
      products.forEach(product => {
        productMap[product._id] = {
          title: product.title,
          price: product.price // Add the price property
        };
      });
      console.log(productMap);
      setProductData(productMap);
      const updatedOrders = orders.map(order => ({
        ...order,
        title: productMap[order.product_id].title,
        price: productMap[order.product_id].price // Append the price
      }));
      console.log(updatedOrders)
      setOrders(updatedOrders);
    } catch (error) {
      // Handle errors
    }
  };
  

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getOrdersData();
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0 && !fetchedProductTitles) { // Check the flag before calling the function
      fetchProductTitles();
      setFetchedProductTitles(true);
    }
  }, [orders, fetchedProductTitles]);

  return (
    <>
      <div style={{ marginTop: '70px', width: '90vw', marginLeft: 'calc(5vw)' }}>
        {orders.length > 0 ?
          <Text m={7}>Following is List of Orders</Text> :
          <Text>There are no users to display</Text>
        }

        <TableContainer>
          <Table variant='striped' colorScheme='facebook'>
            <TableCaption>Placed Orders will Appear Here</TableCaption>
            <Thead>
              <Tr>
                <Th maxWidth={'100px'}>Product Name</Th>
                <Th>Quantity</Th>
                <Th maxWidth={'100px'}>Address</Th>
                <Th isNumeric>Price (₹)</Th>
                <Th maxWidth={'100px'}>Payment</Th>
                <Th>Placed On</Th>
                <Th>Set Status</Th>
                <Th>User ID</Th>
              </Tr>
            </Thead>
            <Tbody>
            {orders.length > 0 && orders[0].title ? (
              orders.map((order, index) => (
                <OrderRow
                  key={index}
                  product_id={order.product_id}
                  user_id={order.user_id}
                  quantity={order.quantity}
                  date={formatDateTime(order.placedAt)}
                  address={order.address}
                  title={order.title} 
                  price = {order.price.actual_price}
                  discount = {order.price.discount}
                  payment_method = {order.payment_method}
                />
              ))
            ) : (
              <>
                <Tr>
                  <Td maxWidth={'100px'}>
                    <Skeleton height='40px' />
                  </Td>
                  <Td>
                    <Skeleton height='40px' />
                  </Td>
                  <Td maxWidth={'100px'}>
                    <Skeleton height='40px' />
                  </Td>
                  <Td>
                    <Skeleton height='40px' />
                  </Td>
                  <Td>
                    <Skeleton height='40px' />
                  </Td>
                  <Td>
                    <Skeleton height='40px' />
                  </Td>
                  <Td>
                    <Skeleton height='40px' />
                  </Td>
                  <Td>
                    <Skeleton height='40px' />
                  </Td>
                </Tr>
              </>
            )}
          </Tbody>

          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Orders_page;
