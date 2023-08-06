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
    Button
  } from '@chakra-ui/react';
  import {
    ChevronRightIcon,
    ChevronLeftIcon,
    Search2Icon 
} from '@chakra-ui/icons';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import styles from '../Product/BrowseProduct.module.css';

const EditUsers = () => {

    const [warning, setWarning] = useState(false);
    const [users, setUsers] =useState(false);
    const isFirstRender = useRef(true);
    const [URL, setURL] = useState("http://localhost:5000/api/admin/users?select=_id,name,email,isActive&limit=15");
    const [page, setPage] = useState({
        next: false,
        prev: false,
        current: '1'
      });

    const getAllusers = async (page_no) => {
     
        
        try {
          var url = URL;
          if (page_no){
           
            url = URL + `&page=${page_no}`;     
            setPage({...page, current: `${page_no}`})
          }else{
            url = URL + `&page=1`
            setPage({...page, current: '1'});
          }
          const res = await axios.get(url);
          setUsers(res.data.data);
          if (res.data.pagination.prev && res.data.pagination.next){
            setPage({
              current: parseInt(res.data.pagination.next.page) - 1,
              next: res.data.pagination.next.page,
              prev: res.data.pagination.prev.page
            })
          }
          else if (!res.data.pagination.prev && !res.data.pagination.next){
            setPage({
              next: false,
              prev: false,
              current: 1
            })
          }
          else if (res.data.pagination.next){
            setPage({
              current: parseInt(res.data.pagination.next.page) - 1,
              next: res.data.pagination.next.page,
              prev: false,
              
            })
          } 
          else if (res.data.pagination.prev){
            setPage({
              current: parseInt(res.data.pagination.prev.page) + 1, 
              prev: res.data.pagination.prev.page,
              next: false
            })
          }
          

                    
   

        } catch (error) {
          if (error.response && !error.response.data.success) {
            setWarning(error.response.data.msg);
          } else if (error.message == 'Network Error'){
            setWarning("Server Unreachable !");
          }
        }
        
    }

    const refreshResults = (e) => {
        getAllusers(e);
        setPage({
          ...page, current: e
        })
      }

    const toggleUserStatus = async (user_id) => {
        try {
            var url = `http://localhost:5000/api/admin/users/toggle/${user_id}`;
            const res = await axios.put(url);
            refreshResults(page.current);
  
          } catch (error) {
            if (error.response && !error.response.data.success) {
              setWarning(error.response.data.msg);
            } else if (error.message == 'Network Error'){
              setWarning("Server Unreachable !");
            }
          }
    }

    useEffect(() => {

        let timer;
        if (isFirstRender.current) {
            isFirstRender.current = false;
            getAllusers();
          }
    
        if (warning) {
          timer = setTimeout(() => {
            setWarning(false);
          }, 5000);
        } 
    
        return () => {
          clearTimeout(timer);
        };
      }, [warning]);
    return (
        <>
        <div style={{marginTop: '70px', width: '90vw', marginLeft: 'calc(5vw)'}}>
            {users ? 
                <Text>Following is List of users</Text>:
                <Text>There are no users to display</Text>
        }


            <TableContainer>
                <Table variant='striped' colorScheme='facebook'>
                    <TableCaption>User Activity can be Edited by admin. But the user can activate their deactivated account by again carrying out the registration process</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>E-mail</Th>
                        <Th>Edit Acivity</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {users && users.map((user, index) => {
                        return (
                            <Tr key={users._id}>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.isActive ? 
                            <Button bg={'red.400'} onClick={() => {
                                toggleUserStatus(user._id);
                            }}>Disable</Button>: 
                            <Button bg={'green.400'} onClick={() => {
                                toggleUserStatus(user._id);
                            }}>Enable</Button>}</Td>
                            </Tr>
                        );
                        })}

                    
                    </Tbody>
                    
                </Table>
                </TableContainer>

                


        </div>
        <div className={styles.paginationContainer}>
                <section className={styles.paginationInnerContainer}>
                  <p className={styles.paginationLink} style={{fontSize: '15px', color: '#0087e8'}} onClick={()=>{
                    if (page.prev){
                        refreshResults(page.prev);
                    }
                  }}><ChevronLeftIcon/>Prev</p>
                  <p className={styles.paginationLink} style={{fontSize: '18px'}} onClick={(e)=>refreshResults(e.target.innerText)}>{page.prev}</p>
                  <p className={styles.paginationLink} style={{fontSize: '20px', backgroundColor: '#ccc', padding: '0 10px', borderRadius: '10px', border: 'solid 0.5px #0087e8'}} onClick={refreshResults}>{page.current}</p>
                  <p className={styles.paginationLink} style={{fontSize: '18px'}} onClick={(e)=>refreshResults(e.target.innerText)}>{page.next}</p>
                  <p className={styles.paginationLink} style={{fontSize: '15px', color: '#0087e8'}}  onClick={()=>{
                    if (page.next){
                      refreshResults(page.next);
                    }
                  }}>Next<ChevronRightIcon/></p>

                </section>
        </div></>
    )
}

export default EditUsers;