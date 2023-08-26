import { Stack, Text, Button } from '@chakra-ui/react';
import Carousel from './AutoCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteIcon} from '@chakra-ui/icons';
import { server } from '../utils';



const CartItem = (props) =>{

    var {product, quantity, user_id} = props;
    const [productQuantity, setProductQunatity] = useState(quantity);



    const decreaseQuantity = () => {
        if ((parseInt(productQuantity) - 1)>0){
            var newQuantity = parseInt(productQuantity) - 1
            setProductQunatity(newQuantity);
            updateQuantity(newQuantity);
        }    
    }
    const increaseQuantity = () => {
        if ((parseInt(productQuantity)-1)<6){
            var newQuantity = parseInt(productQuantity) + 1
            setProductQunatity(newQuantity);
            updateQuantity(newQuantity);
        }
    }

    const updateQuantity = async (quantity) => {
        try {

            const url = server + `admin/updateproduct/update-cart-quantity`;
            const res = await axios.put(url, {product_id: product._id, user_id: user_id, quantity: quantity});
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

    const deleteItem = async () => {
        try {

            const url = server + `client/cart/delete`;
            const res = await axios.post(url, {_id: user_id, product_id: product._id});
            var results = (res.data.data); 
            console.log(results);
            window.location.reload();
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



    return (
        <>
        <div style={{height: '230px', display: 'flex', flexWrap: 'wrap', boxShadow: '0 0 5px #888'}}>
            <div style={{width: '40%', padding: '15px'}}>
                {
                    product &&
                    <Carousel folderName={product.slug} imageName={product.details.imgs} />
                }
                
            </div>
            <div style={{width: '60%', padding: '15px', position: 'relative'}}>
                
                <Stack>
                    { product &&
                    <>
                    <Link to={'/admin/browseproduct/product/' + product._id}>
                    <Text textAlign={'left'} fontSize={'20px'} color={'gray.600'} fontWeight={'bold'} m={'0 15px 0 0'}>{product.title}</Text>
                    </Link>
                    <Text textAlign={'left'} fontSize={'20px'} color={'pink.700'} fontWeight={'semibold'}>₹ {
                       parseInt(parseInt(product.price.actual_price) * (1 - parseInt(product.price.discount)/100) + 1)
                    }</Text>
                    </>
                    }
                </Stack>
                <span style={{position: 'absolute', right: '12px', top: '10px', display: 'block'}}><DeleteIcon cursor={'pointer'} color={'red.600'} onClick={deleteItem}/></span>
                    
                    <div style={{position: 'absolute', bottom: '25px', display: 'flex', flexDirection: 'row'}}>
                        <span style={{display: 'block', height: '30px', width: '30px', border: 'solid 0.5px #000', cursor: 'pointer'}} onClick={decreaseQuantity}>-</span>
                        <span style={{display: 'block', height: '30px', width: '50px', border: 'solid 0.5px #000'}}>{productQuantity}</span>
                        <span style={{display: 'block', height: '30px', width: '30px', border: 'solid 0.5px #000', cursor: 'pointer'}} onClick={increaseQuantity}>+</span>
                    </div>
                
            </div>
        </div>
        
        </>
    )
}

export default CartItem;