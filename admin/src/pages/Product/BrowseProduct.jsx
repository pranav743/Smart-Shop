import React, {useState, useEffect, useRef} from 'react'
import styles from './BrowseProduct.module.css';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Alert,
    AlertIcon,
    Progress,
    useBoolean,
    
  } from '@chakra-ui/react';
  import { EditIcon,
      ChevronRightIcon,
      ChevronLeftIcon,
      Search2Icon 
  } from '@chakra-ui/icons';
  import axios from 'axios';
  import ProductCard from "./ProductCard"


const BrowseProduct = () => {
    const isFirstRender = useRef(true);

    const [productDetails, setProductDetails] = useState('');
    const [page, setPage] = useState({
      next: false,
      prev: false,
      current: '1'
    });
    const [fetching, setFetching] = useState(true);
    const [URL, setURL] = useState("http://localhost:5000/api/admin/products?page=1");
    const [cardView, setCardView] = useBoolean();
    

    const [warning, setWarning] = useState(false);

    const GetList = async (data) =>{
        setFetching(true);
        
        try {
          if (data){
            var url = `http://localhost:5000/api/admin/products?page=${data}`
          } else{
            var url = URL
          }
          const res = await axios.get(url, data);
          console.log(res.data); 
          setProductDetails(res.data);
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
          

                    
          setFetching(false)  

        } catch (error) {
          if (error.response && !error.response.data.success) {
            setWarning(error.response.data.msg);
          } else if (error.message == 'Network Error'){
            setWarning("Server Unreachable !");
          }
        }
      }

      const refreshResults = (e) => {
        var url = `http://localhost:5000/api/admin/products?page=${e}`;
        setURL(url);

        GetList(e);
        setPage({
          ...page, current: e
        })
      }

      useEffect(() => {

        let timer;
        if (isFirstRender.current) {
            isFirstRender.current = false;
            GetList();
          }
    
        if (warning) {
          timer = setTimeout(() => {
            setWarning(false);
          }, 5000);
        }
    
    
        return () => {
          clearTimeout(timer);
        };
      }, [warning, GetList]);
    
      const centerAll = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    

    return(
        <>
        {
        warning && 
        <Alert status='error'style={{position: 'fixed', zIndex: '3', bottom: '5'}}>
            <AlertIcon />
            {warning}
        </Alert>
        }
        { fetching ? 
        <div style={{height: 'calc(100vh - 60px)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '60px', flexDirection: 'column'}}>
            
            <Progress size='xs' isIndeterminate width='60vw'/>
            <p style={{marginTop: '2vh', letterSpacing: '2px'}}>Loading...</p>
        </div> :

        <>

        <div style={{display: 'flex', flexDirection: 'column', marginTop: '60px'}}>

          <div className={styles.searchContainer}>

            <span style={{position: 'relative'}}>
              <span id={styles.searchIcon}><Search2Icon/></span>
              <input type="text" id={styles.searchBar} placeholder='Search...'/>
            </span>

          </div>
          
        </div>

        <div style={{minHeight: 'calc(100vh - 60px)', width:'100%', marginTop: '60px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
      
            <div style={{height: 'auto', margin: '15px 3vw', width: '100%', border: 'solid 0px #000', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                <div onClick={setCardView.toggle} style={{width: '100%', cursor: 'pointer', ...centerAll}} className={styles.changeView}>Click Here to change View</div>

            { cardView ?
                <>
                {productDetails.data.map((item, index) => (
                        <div className={styles.stackElement} key={item._id}>
                            <div className={styles.itemPhoto}><img src="https://picsum.photos/200" alt="Product Photo" /></div>
                            <div className={styles.infoContainer}>
                            <p className={styles.productP} style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '10px' }}>
                                {item.title} <EditIcon ml='2vw' cursor='pointer' />
                            </p>
                            <div style={{ display: 'flex', height: 'auto', alignItems: 'center', marginBottom: '10px' }}>
                                <p style={{ marginRight: '10px' }}>Quantity : </p>
                                <p className={styles.productP} style={{ fontSize: '18px', fontWeight: 'bold', border: 'solid 0.7px #0081fa', padding: '5px 10px', borderRadius: '5px', color: '#0081fa', width: 'fit-content' }}>
                                {item.details.available_quantity}
                                </p>
                            </div>
                            <p className={styles.productP} style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', border: 'solid 0.7px #0081fa', width: 'fit-content', padding: '5px 10px', borderRadius: '5px', color: '#0081fa', paddingLeft: '10px' }}>
                                {item.category.broad_category}
                            </p>
                            <div style={{display: 'flex', boxShadow: '0 0 5px #ddd', width: 'fit-content'}}>
                                <span style={{height: '30px', width: '35px', borderRadius: '5px 0 0 5px', ...centerAll, fontSize: '20px'}} className={styles.editButtons}>-</span>
                                <span style={{height: '30px', width: '70px', backgroundColor: '#fff', ...centerAll, fontSize: '20px', letterSpacing: '1px'}}>{item.details.available_quantity}</span>
                                <span style={{height: '30px', width: '35px', borderRadius: '0 5px 5px 0',...centerAll, fontSize: '20px'}} className={styles.editButtons}>+</span>
                            </div>
                            </div>
                            
                            <div style={{ width: '100px', height: 'auto', paddingTop: '15px' }}>
                            <Stat>
                                <StatLabel>Price</StatLabel>
                                <StatNumber>₹{item.price.actual_price}</StatNumber>
                                <StatHelpText>
                                <StatLabel>Discount</StatLabel>
                                <StatArrow type='decrease' />
                                {item.price.discount}%
                                </StatHelpText>
                                <StatLabel>Actual Price</StatLabel>
                                <StatNumber fontSize='15px' color='green.600'>₹{Math.floor(item.price.actual_price * ((100 - item.price.discount)/100))}</StatNumber>
                            </Stat>
                            </div>
                        </div>
                        ))}
                </>
                    :
                <>
                {productDetails.data.map((item) => (
                    <ProductCard title= {item.title} description = {item.details.description}  category = {item.category.broad_category} price = {`₹${Math.floor(item.price.actual_price * ((100 - item.price.discount)/100))}`} available_quantity = {item.details.available_quantity} date = {item.editedAt} _id={item._id} key={item._id}/>
                ))}
                </>     
            }
            
            </div>
            
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
        </div>

        </>
        }
        
        </>
    )
}

export default BrowseProduct;