import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ApexChart from './PieChart';
import { FcAbout, FcAssistant, FcCollaboration, FcDonate, FcManager } from 'react-icons/fc';
import axios from 'axios';

const Card = ({ heading, description, icon, href }) => {
  return (
    // <Box
    //   maxW={{ base: 'full', md: '275px' }}
    //   w={'full'}
    //   borderWidth="1px"
    //   borderRadius="lg"
    //   overflow="hidden"
    //   p={5}
    // >
    //   <Stack align={'start'} spacing={2}>
    //     <Flex
    //       w={16}
    //       h={16}
    //       align={'center'}
    //       justify={'center'}
    //       color={'white'}
    //       rounded={'full'}
    //       bg={useColorModeValue('gray.100', 'gray.700')}
    //     >
    //       {icon}
    //     </Flex>
    //     <Box mt={2}>
    //       <Heading size="md">{heading}</Heading>
    //       <Text mt={1} fontSize={'sm'}>
    //         {description}
    //       </Text>
    //     </Box>
        
    //   </Stack>
    // </Box>
    <div style={{display: 'flex', width: '250px', height: '140px', backgroundColor: 'black', position: 'relative', borderRadius: '15px', boxShadow: '0 0 5px #fff', margin: '20px'}}>

      <span style={{display: 'block', height: '60px', width: '150px', position: 'absolute', top: '-30px', background:'linear-gradient(360deg, #000, #333)', borderRadius: '30px', marginLeft: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', boxShadow: '0 0 5px #fff', color: '#FFD700'}}>{description}</span>

      <div style={{marginTop: '60px', color: '#eee', fontSize: '20px', display: 'flex', justifyContent: 'center', width: '100%', fontWeight: 'bold'}}>{heading}</div>


    </div>
  );
};

const GridListWith = () => {

    const [URL, setURL] = useState("http://localhost:5000/api/admin/products/analytics");
    const [data, setData] = useState(false);
    
    const LoadStats = async () => {
        try {
            const url = URL;
            const res = await axios.get(url);
            setData(res.data);
            console.log(res.data);
   
          } catch (error) {
            if (error.response && !error.response.data.success) {
            //   setWarning(error.response.data.msg);
            console.log(error.response.data.msg)
            } else if (error.message === 'Network Error') {
              console.log("Server Error");
            }
          }
    }
    useEffect(()=>{
        LoadStats();
    }, []);
  return (
    <Box p={4} m={'60px 0 0 0'} style={{background: 'linear-gradient(270deg, #002869, #000)', minHeight: 'calc(100vh - 60px)', width: '100%'}}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} color={'gray.200'}>
          DashBoard
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Get count of Products of all listed category
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">

            {
                data && 
                data.data.map((item, index)=>(
                    <Card
                        heading={item.category}
                        // icon={<Icon as={FcAssistant} w={10} h={10} />}
                        description={(item.count)}                       
                    />
                ))
            }
          
        </Flex>
      </Container>
      <Flex justifyContent={'center'} m={'75px 0 50px 0'}>
        {
            data && <ApexChart data={data.data}/>
        }
        
      </Flex>
    </Box>
  );
};

export default GridListWith;
