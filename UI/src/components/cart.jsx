import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [state, setstate] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user)
  useEffect(() => {
    axios.get(`http://localhost:7000/customer/viewCart/${user?._id}`)
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [state]);

  const handleDelete = async (cart) => {
    console.log('active')
    axios.delete(`http://localhost:7000/customer/deleteFromCart/${cart._id}`)
        .then((Response) => {
            console.log(Response.data)
            setstate(!state)
        })
        .catch((error) => {
            console.log(error)
        })
}

  return (
    <>
      <div className='cart-body'>
        {cartItems.map((item, index) => (
          <Card key={index} sx={{ display: 'flex', maxWidth: 900, margin: '60px auto' }}>
            <CardMedia
              component="img"
              sx={{ objectFit: "cover" ,width: 190 }}
              image={`http://localhost:7000/uploads/product/${item?.product_id?.picture}`}
              alt={item.title}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography gutterBottom variant="h5" component="div">
                {item?.product_id?.title} - {item?.product_id?.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {item?.product_id?.price} Rs.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item?.product_id?.quantity}
              </Typography>
            </CardContent>
            <IconButton sx={{marginBottom: 15, marginRight: 2}} onClick={() => handleDelete(item)} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
          </Card>
        ))}
      </div>
    </>
  )
}
