import React from 'react';

import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className='navbar__container'>
      <p className='logo'>
        <Link href='/'>Ecommerce Store</Link>
      </p>

      <button type='button' className='cart__icon' onClick="">
        <AiOutlineShopping />
        <span className='cart__item-qty'>1</span>
      </button>
    </div>
  )
}

export default Navbar