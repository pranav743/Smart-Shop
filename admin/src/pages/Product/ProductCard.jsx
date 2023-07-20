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
  
  export default function SocialProfileSimple(props) {

    const { title, description, category, price, available_quantity, date, _id } = props;
    const truncatedDescription = description.length > 70 ? description.slice(0, 70) + '...' : description;
    const quantity = `Quantity : ${available_quantity}`;
    const formattedDate = new Date(date).toLocaleDateString();

    return (
      <Center py={6} style={{minHeight: '400px'}}>
        <Box style={{minHeight: '400px'}}
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          m={3}
          >
          {/* <Avatar
            size={'xl'}
            src={
              'https://picsum.photos/200'
            }
            alt={'Product Img'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          /> */}
          <div>
            <img src="https://picsum.photos/200" alt="Product Photo" width='100%' style={{margin: '0 0 15px 0'}}/>
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
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              Edit
            </Button>
          </Stack>
        </Box>
      </Center>
    );
  }