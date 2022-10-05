import React from 'react';

import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product;

  return (
    <div>
    <div className="product__detail-container">
      <div>
        <div className="image-container">
          <img src={urlFor(image && image[0])} className="product__detail-image" />
        </div>
        {/* <div className="small-images-container">
        
        </div> */}
      </div>

      <div className="product__detail-desc">
        <h1>{name}</h1>
        <div className="reviews">
          <div>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>
            (20)
          </p>
        </div>
        <h4>Details: </h4>
        <p>{details}</p>
        <p className="price">${price}</p>
        <div className="quantity">
          <h3>Quantity:</h3>
          <p className="quantity__desc">
            <span className="minus" onClick=""><AiOutlineMinus /></span>
            <span className="num">{1}</span>
            <span className="plus" onClick=""><AiOutlinePlus /></span>
          </p>
        </div>
        <div className="buttons">
          <button type="button" className="add-to-cart" onClick="">Add to Cart</button>
          <button type="button" className="buy-now" onClick="">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {slug: product.slug.current}
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product);
  
    return {
      props: { product, products },
    };
  }

export default ProductDetails