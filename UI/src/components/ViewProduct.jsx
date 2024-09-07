import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewProduct(  ) {
    const addToCart = (productDetails) => {
        let user = JSON.parse(localStorage.getItem('user'))
        let cartData = {
          product_id: productDetails?._id,
          customer_id: user?._id,
          quantity: 1
        };
    
        axios.post('http://localhost:7000/customer/addToCart', cartData)
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
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:7000/customer/viewSingleProduct/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    return (
        <div className='view-product'>
            {product && (
                <Card sx={{ display: 'flex', height: 'auto' }}>
                    <CardMedia
                        sx={{ objectFit: "cover", width: "100%", height: "300px" }}
                        component="img"
                        image={`http://localhost:7000/uploads/product/${product?.picture}`}
                        alt={product?.title}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ fontSize: 14, width: 350, height: 500 }}>
                            <Typography color="text.secondary" gutterBottom>
                                {product?.title}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {product?.description}
                            </Typography>
                            <Typography sx={{marginTop: 2}} color="text.secondary">
                                Price: {product?.price}
                            </Typography>
                            <Typography variant="body2">
                                Quantity: {product?.quantity}
                            </Typography>
                            <CardActions sx={{ marginTop: 30, marginLeft: 20 }}>
                                <Button onClick={() => addToCart(product)} size="large">Add to Cart</Button>
                            </CardActions>
                        </CardContent>
                    </div>
                </Card>
            )}
        </div>
    );
}
