import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  MenuButton,
  Center,
  Avatar,
  MenuItem,
  MenuDivider,
  MenuList,
  Menu
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

export default function WithSubnavigation() {

  const [user, setUser] = useState({name: "Username"});

  const handleLogout = () => {
    localStorage.removeItem('tokenSmartShop');
    window.location = '/';
  };

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

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("tokenSmartShop") || false);
  const { isOpen, onToggle } = useDisclosure();


  
  useEffect(() => {

    if (localStorage.getItem("tokenSmartShop")){
      fetchUserDetails();  
    }

    

  }, []);

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            <Avatar
                    size={'sm'}
                    src='/Logo.png'
                  />
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        { isLoggedIn ? 
        <>
        <span style={{margin: '0 15px 0 0'}}>
        <Menu>
          <Link to="/client/cart">
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src='/cart.png'
                  />
                </MenuButton>
          </Link>
               
        </Menu>
        </span>
        <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src='/3135715.png'
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'/3135715.png'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Details</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
        </Menu>
        </>

        :
        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
          
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
          <Link to="/client/signin">
            Sign In
            </Link>
          </Button>
          
          <Link to="/client/signup">
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}
          >
            Sign Up
          </Button>
          </Link>
        </Stack>
}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
                <Link to={navItem.link}>
              <Box
                as="a"
                p={2}
                // href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <Link to={child.link}>
                    <DesktopSubNav key={child.label} {...child} />
                    </Link>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};


const NAV_ITEMS = [
  {
    label: 'Categories',
    children: [
        {
          label: 'Electronics',
          subLabel: 'Discover the latest gadgets',
          link: '/electronics',
        },
        {
          label: 'Fashion',
          subLabel: 'Stay in style with the latest trends',
          link: '/fashion',
        },
        {
          label: 'Home & Kitchen',
          subLabel: 'Elevate your living spaces',
          link: '/home-%26-kitchen',
        },
        {
          label: 'Beauty & Personal Care',
          subLabel: 'Look and feel your best',
          link: '/beauty-%26-personel-care',
        },
        {
          label: 'Sports & Outdoors',
          subLabel: 'Explore your adventurous side',
          link: '/sports-%26-outdoors',
        },
      ],
  },
  {
    label: 'My Orders',
    children: [
      {
        label: 'Current',
        subLabel: 'Find your current orders',
        link: '/client/current-orders',
      },
      {
        label: 'Past',
        subLabel: 'Completed orders here',
        link: '/client/history-orders',
      },
    ],
  },
  {
    label: 'Browse',
    link: '/',
  },
  
];
