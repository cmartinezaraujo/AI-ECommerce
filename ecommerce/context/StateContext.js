import {React, createContext, useContext, useState, useEffect} from "react";

import {toast} from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
    /*
       Cart State
       -showCart: boolean to show/hide cart
       -cartItems: array of items in cart
       -totalPrice: total price of items in cart
       -totalItems: total number of items in cart
       -qty: quantity of items in cart
    */
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);
      

    useEffect(() => {
        const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");
        setcartItems(localStorageCart);
        const localStorageTotalPrice = JSON.parse(localStorage.getItem('totalPrice') || 0); 
        setTotalPrice(localStorageTotalPrice);
        const localStorageTotalQuantities = JSON.parse(localStorage.getItem('totalQuantities') || 0);
        setTotalQuantities(localStorageTotalQuantities);
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
    }, [cartItems, totalPrice, totalQuantities]);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        //if product is already in cart, increase quantity
        if (checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
                }
                return cartProduct;
            });

            setcartItems(updatedCartItems);
        }else{
            product.quantity = quantity;

            setcartItems([...cartItems, product]);
        }

        toast.success(`${quantity} ${product.name} added to cart`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.quantity * foundProduct.price));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setcartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);


        if(value === 'increment'){
            setcartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity+1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities+1);
        }else if( value === 'decrement'){
            if(foundProduct.quantity > 1){
                setcartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity-1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities-1);
            }
        }
    }

    const increaseQuantity = () => {
        setQuantity(prevQty => prevQty + 1);
    }

    const decreaseQuantity = () => {
        setQuantity(prevQty => {
            if(prevQty-1 < 1) return 1;
            return prevQty - 1
        });
    }

    return (
        <Context.Provider 
            value={{
                showCart, 
                cartItems, 
                totalPrice,
                totalQuantities,
                quantity,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                showCart,
                setShowCart,
                totalQuantities,
                toggleCartItemQuantity,
                onRemove,
                setcartItems,
                setTotalPrice,
                setTotalQuantities
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);