import React, { useState, useEffect } from 'react';
import styles from './AddProduct.module.css';
import { SimpleGrid, Box, Input, Select, Stack, Textarea, Checkbox, position } from '@chakra-ui/react';
import ProductListingGuidelines from './uploadGuidelines';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import axios from 'axios';


const CheckFormat = (data) => {
  var stack = [data];
  while (stack.length > 0) {
    var currentObj = stack.pop();
    for (var key in currentObj) {
      if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
        stack.push(currentObj[key]);
      } else if (currentObj[key] === '' || currentObj[key] === null || currentObj[key] === undefined) {
        return "Fields cannot be left Empty !";
      }
    }
  }
  if (data.title.length > 100){
    return "Title should be less that 100 letters"
  } else if(isNaN(data.price.discount)){
    return "Discount should be an Integer"
  } else if (data.price.discount > 99 || data.price.discount < 0){
    return "Invalid discount is applied"
  } else if ( data.details.available_quantity > 500) {
    return "You cannot have such a large quantity"
  } else {
    return false
  }  
}

const AddProduct = () => {
const [productDetails, setProductDetails] = useState({
    title: '',
    brand: '',
    category: '',
    subcategory: '',
    sellingPrice: '',
    discountPercentage: '',
    material: '',
    countryOfOrigin: '',
    quantity: '',
    description: '',
    agreedToGuidelines: false,
    });

  
  const [warning, setWarning] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setProductDetails((prevDetails) => ({ ...prevDetails, agreedToGuidelines: checked }));
  };
  
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setProductDetails((prevDetails) => ({ ...prevDetails, category: value }));
  };

  const handleUpload = () => {
    var data = {
      title: productDetails.title,
      category: {
        broad_category: productDetails.category,
        sub_category: productDetails.subcategory
      },
      price: {
        actual_price: parseInt(productDetails.sellingPrice),
        discount: parseInt(productDetails.discountPercentage)
      },
      details: {
        brand: productDetails.brand,
        material: productDetails.material,
        country_of_origin: productDetails.countryOfOrigin,
        available_quantity: parseInt(productDetails.quantity),
        description: productDetails.description,
        isReturnable: false,
        imgs: ['photo.jpg']
      }
    };
    let invalidity = CheckFormat(data);
    if (invalidity){
      setWarning(invalidity);
    } else if (!productDetails.agreedToGuidelines){
      setWarning("You must check the check box to upload the product !")
    }
    else{
      listProduct(data);
    }
  };

  const listProduct = async (data) =>{
    try {

      const url = "http://localhost:5000/api/admin/listproduct"
      const res = await axios.post(url, data);
      console.log(res);     
      clearInput(); 
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setWarning(error.response.data.msg);
      } else if (error.message == 'Network Error'){
        setWarning("Server Unreachable !");
      }
    }
  }

  const clearInput = () =>{
    setProductDetails({
      title: '',
      brand: '',
      category: '',
      subcategory: '',
      sellingPrice: '',
      discountPercentage: '',
      material: '',
      countryOfOrigin: '',
      quantity: '',
      description: '',
      agreedToGuidelines: false,
      })
  };

  useEffect(() => {
    let timer;

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
      
      {
        warning && 
      <Alert status='error'style={{position: 'fixed', zIndex: '3', bottom: '5'}}>
        <AlertIcon />
        {warning}
      </Alert>
      }
      <div style={{ minHeight: 'calc(100vh - 60px)', width: '100%', marginTop: '60px' }} className={styles.centerAll}>
        <div className={styles.container}>
          <h1 style={{letterSpacing: '1px', fontSize: '15px'}}>List Your Product</h1>
          <div
            style={{
              display: 'flex',
              textAlign: 'left',
              maxWidth: '100%',
              padding: '10px',
              backgroundColor: '#fff',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '90%' }}>
              <ProductListingGuidelines />
            </div>
          </div>

          <div className={styles.innerContainer}>
            <SimpleGrid columns={[1, null, 2]} spacing="20px">
              <Stack bg="white" height="auto" spacing={2}>
                <div>
                  <Input variant="filled" placeholder="Title of Item" maxW="500px" m="10px 0" name="title" value={productDetails.title} onChange={handleInputChange} />
                </div>
                <div>
                  <Input variant="filled" placeholder="Filled" maxW="500px" m="10px 0" name="filled" value={productDetails.filled} onChange={handleInputChange} />
                </div>
                <div className={styles.centerAll} style={{ margin: '10px 0' }}>
                    <Select variant="flushed" maxW="500px" name="category" value={productDetails.category} onChange={handleSelectChange}>
                        <option value= 'None'>-</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                        <option value="Sports & Outdoors">Sports & Outdoors</option>
                    </Select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '5px' }}>
                  <span style={{ margin: '5px' }}>
                    Enter actual Product Price:
                    <Input variant="filled" placeholder="Selling Price" maxW="200px" m="10px 0" name="sellingPrice" value={productDetails.sellingPrice} onChange={handleInputChange} />
                  </span>
                  <span style={{ margin: '5px' }}>
                    Enter Discount percentage:
                    <Input variant="filled" placeholder="Discount %" maxW="200px" m="10px 0" name="discountPercentage" value={productDetails.discountPercentage} onChange={handleInputChange} />
                  </span>
                </div>
                <div>
                  <Input variant="filled" placeholder="Material" maxW="500px" m="10px 0" name="material" value={productDetails.material} onChange={handleInputChange} />
                </div>
              </Stack>
              <Box bg="white" height="auto" padding="0 10px">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Input variant="filled" placeholder="Brand Name" maxW="500px" m="10px 0" name="brand" value={productDetails.brand} onChange={handleInputChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Input variant="filled" placeholder="Country of Origin" maxW="500px" m="10px 0" name="countryOfOrigin" value={productDetails.countryOfOrigin} onChange={handleInputChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Input variant="filled" placeholder="Sub-Category" maxW="500px" m="10px 0" name="subcategory" value={productDetails.subcategory} onChange={handleInputChange} />
                </div>
                <div style={{ display: 'flex' }}>
                  <span style={{ margin: '0 10px' }}>
                    Enter available quantity:
                    <Input variant="filled" placeholder="Quantity" maxW="200px" m="20px 0 10px 20px" name="quantity" value={productDetails.quantity} onChange={handleInputChange} />
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                  <div style={{ textAlign: 'start' }}>Describe the product which will appear on the website: </div>
                  <Textarea placeholder="Description" m="7px 1px" maxW="500px" name="description" value={productDetails.description} onChange={handleInputChange} />
                </div>
              </Box>
            </SimpleGrid>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', padding: '0 4vw' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'start', textAlign: 'left' }}>
              <Checkbox onChange={handleCheckboxChange}>I confirm to list my product on Shop Smart for sale complying with the platform guidelines</Checkbox>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className={styles.uploadButton} onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
