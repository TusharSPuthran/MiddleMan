import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import CustomCard from '../components/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Token") == null) {
      navigate("/login");
    } else {
      setToken(JSON.parse(localStorage.getItem("Token")));
    }
    axios.get("http://localhost:7000/customer/viewAllProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Nav />
      <CustomCard token={token} products={products} />
    </>
  );
}
