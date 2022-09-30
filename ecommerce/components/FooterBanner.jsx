import React from 'react';

import Link from 'next/link';
import { urlFor } from '../lib/client';

/*
  This component is used to display the footer banner of the home page.
  It takes in the footerBanner object following the schema defined for sanity.
  Schema located in sanity/schemas/footerBanner.js
 */
const FooterBanner = ({footerBanner:{discount, largeText1, largeText2, saleTime, smallText,
midText, desc, product, buttonText, image}}) => {
  return (
    <div className='footer-banner__container'>
      <div className='banner__desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} className='footer-banner__image' alt="" />
      </div>
    </div>
  )
}

export default FooterBanner