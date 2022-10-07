import {React, useState} from 'react';

import { Product } from '../../components';

import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0);

    const {increaseQuantity, decreaseQuantity, quantity, onAdd} = useStateContext();

  return (
    <div>
    <div className="product__detail-container">
      <div>
        <div className="image-container">
          <img src={urlFor(image && image[index])} className="product__detail-image" />
        </div>
        <div className="small-images__container">
            {image?.map((img, i) => (
                <img
                    src={urlFor(img)}
                    className={i === index ? 
                        `small-image selected-image` : 
                        `small-image`}
                    onMouseEnter={() => setIndex(i)}
                />
            ))}
        </div>
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
            <span className="minus" onClick={decreaseQuantity}><AiOutlineMinus /></span>
            <span className="num">{quantity}</span>
            <span className="plus" onClick={increaseQuantity}><AiOutlinePlus /></span>
          </p>
        </div>
        <div className="buttons">
          <button type="button" className="add-to-cart" onClick={() => onAdd(product, quantity)}>Add to Cart</button>
          <button type="button" className="buy-now" onClick="">Buy Now</button>
        </div>
      </div>
    </div>

    <div className='maylike-products__wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
            <div className='maylike-products__container track'>
                {products.map((item) => (
                    <Product key={item._id} product={item}/>
                ))}
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