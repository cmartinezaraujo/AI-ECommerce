import React from 'react';

import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({product: {image, name, slug, price}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product__card'>
          <img 
            src={urlFor(image && image[0])} 
            alt="" 
            width={250}
            high={250}
            className='product__image'
            />

          <p className='product__name'>{name}</p>
          <p className='product__price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product