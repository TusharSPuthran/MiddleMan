import React, { useEffect, useState } from 'react'
import Cart from '../components/cart'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function cartPage() {
  return (
    <div>
      <Nav />
      <Cart/>
    </div>
  )
}