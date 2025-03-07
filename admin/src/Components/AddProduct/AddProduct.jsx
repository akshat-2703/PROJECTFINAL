import  { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {
  
    const [image,setImage] = useState(null) ;
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e) =>{
     setImage(e.target.files[0]) ;
    }
const changeHandler = (e) =>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
}
 const Add_Product = async ()=>{
  console.log(productDetails);
  let responseData ;
  let product = productDetails ;
  
  let formData = new FormData() ;
  formData.append('product',image) ;
   
  await fetch('https://projectfinal-rqo1.onrender.com/upload',{
    method : 'POST',
    headers : {
      Accept : 'application/json'
    },
    body : formData,
  }).then((resp) => resp.json()).then((data)=>{responseData = data}) 
 
  if(responseData.success)
  {
    product.image = responseData.image_url ;
    console.log(product);
    await fetch('https://projectfinal-rqo1.onrender.com/addproduct',{
      method : 'POST',
      headers : {
        Accept : 'application/json',
        'Content-Type' : 'application/json',
       },
       body : JSON.stringify(product),
    }).then((resp)=>resp.json()).then((data)=>{
      data.success?alert("Product added"):alert("Failed")
    })
  }
 }

/*const Add_Product = async () => {
  console.log(productDetails); // Log product details for debugging

  try {
    // Image Upload
    //const formData = new FormData();
  //  console.log(formData) ;
    //formData.append('image', image); // Assuming 'image' is a file object

    const imageResponse = await fetch('https://projectfinal-rqo1.onrender.com/upload', {
      method: 'POST',
      body: image
    });
    

    if (!imageResponse.ok) {
      throw new Error('Image upload failed:', await imageResponse.text());
    }

    const imageData = await imageResponse.json();

    // Product Addition
    const product = { ...productDetails, image: imageData.image_url }; // Spread operator for product details and add image URL

    const productResponse = await fetch('https://projectfinal-rqo1.onrender.com/addproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!productResponse.ok) {
      throw new Error('Product addition failed:', await productResponse.text());
    }

    const productData = await productResponse.json();
    alert(productData.success ? 'Product added' : 'Failed to add product');

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.'); // User-friendly error message
  }
};*/
    return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick = {()=>{Add_Product()}}  className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
