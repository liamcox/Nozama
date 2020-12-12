import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {};
    }, [dispatch]);

    return loading ? (
        <dive>Loading...</dive>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <ul className='products'>
            {products.map((product) => (
                <li key={product._id}>
                    <div className='product'>
                        <Link to={`/products/${product._id}`}>
                            <img
                                className='product-image'
                                src={product.image}
                                alt='product'
                            />
                            <div className='product-name'>{product.name}</div>
                        </Link>

                        <div className='product-brand'>{product.brand}</div>
                        <div className='product-price'>${product.price}</div>
                        <div className='product-rating'>
                            {product.rating} Stars ({product.numReviews})
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default HomeScreen;
