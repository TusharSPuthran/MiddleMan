import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import bgImage from './bg.jpg'

export default function CustomCard({ products, token }) {
  const addToCart = (productDetails) => {
    let user = JSON.parse(localStorage.getItem('user'))
    let cartData = {
      product_id: productDetails?._id,
      customer_id: user?._id,
      quantity: 1
    };
    Axios.post('http://localhost:7000/customer/addToCart', cartData, { headers: { "auth-token": token } } )
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <img className='image' src={bgImage} alt="Background Image" />
      <div className='card-body'>
        {products.map(product => (
          <Card key={product.id} sx={{ width: 315, margin: 5, height: '320px' }}>
            <CardMedia
              component="img"
              sx={{ height: 140 }}
              image={`http://localhost:7000/uploads/product/${product.picture}`}
              title={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title} {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {product.quantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/view/${product._id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color='primary'>View</Button>
              </Link>
              <Button onClick={() => addToCart(product)} size="small">Add to cart</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}
