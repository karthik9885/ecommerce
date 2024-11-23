import { Box, Button, Grid, LinearProgress,  Rating } from '@mui/material';
import {  Radio, RadioGroup } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductReviewCard from '../productDetails/ProductReviewCard';
import { addItemToCart } from '../../../state/cart/Action';

const ItemDetails = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const [selectedSize, setSelectedSize] = useState(product?.size[2]);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    console.log("products in item section", product);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    const handleAddToCart =()=>{
        const data = {productId:params.id,size:selectedSize.name}
        console.log("data added to cart",data)
        dispatch(addItemToCart(data))
        navigate("/cart")
      }

  return (
    <div>
        {product ? (
            <>
                <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            
            <li className="text-sm">
              {/* <a href={product?.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product?.category?.name}
              </a> */}
            </li>
          </ol>
        </nav>

            <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
            {/* Image gallery */}
                <div className="flex flex-col items-center">
                <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                
                    <img
                    src={product?.imageUrl}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-wrap space-x-5 justify-center">
                {/* {product.images?.map((item) =>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover object-center"
                    />
                    </div> )} */}
                </div>
                </div>

                {/* Product info */}
        <div className="lg:col-span-1 maxt-auto max-w-2x1 px-4 pb-16 sm:px-6 lg:max-w-7x1 lg:max-w-7x1 lg:px-8 lg:pb-24">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-semibold text-gray-900">{product?.brand} </h1>
            <h1 className='text-lg lg:text-x1 text-gray-900 opacity-60 pt-1'>{product?.title} </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className='flex space-x-5 items-center text-lg lg:text-x1 text-grat-900 mt-6'>
                <p className='font-semibold'>₹{product?.discountedPrice}</p>
                <p className='opacity-50 line-through'>₹{product?.price}</p>
                <p className='text-green-600 font-semibold'>{product?.disscountPersent}% off</p>

            </div>

            {/* Reviews */}
            <div className="mt-6">
                <div className='flex flex-items-center space-x-3'>
                <Rating name="read-only" value={5.5} readOnly />
                <p className='opacity-50 text-sm'> 56540 Ratings</p>
                <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'> 3870 Reviews</p>
                </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product?.size.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={size.quantity<0}
                        className={({ focus }) =>
                          classNames(
                            (size.quantity>0)
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            focus ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ checked, focus }) => (
                          <>
                            <span>{size.name}</span>
                            {(size.quantity>0) ? (
                              <span
                                className={classNames(
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  focus ? 'border' : 'border-2',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <Button onClick={handleAddToCart} variant="contained" sx={{px:"2rem",py:"1rem" ,bgcolor:"#9155fd" }}>
                Add To Cart
              </Button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product?.details}</p>
              </div>
            </div>
          </div>
        </div>
            </section>
        
        <section>
            <h1 className='font-semibold tect-lg pb-4'>Recent Review & Ratings</h1>
            <div className='border p-5'>
                <Grid container spacing={7}>
                    <Grid item xs={7}>
                        <div className='space-y-5'>
                            { [1, 1, 1].map(()=><ProductReviewCard/>)}
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <h1 className='text-x1 font-semibold pb-2'>Product Ratings</h1>
                        <div className='flex items-center space-x-3'>
                            <Rating name="read-only" value={4.6} precision={.5} readOnly/>
                        <p className='opacity-60'>54890 Ratings</p>
                        </div>
                        <Box className="mt-5 space-y-3">
                            <Grid container justifyContent="center" alignItems="center" gap={2}>
                                <Grid items xs={2}>
                                    <p>Excellent</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={40} color="success"/>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" gap={2}>
                                <Grid items xs={2}>
                                    <p>Very Good</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={30} color="success"/>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" gap={2}>
                                <Grid items xs={2}>
                                    <p>Good</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={25} color="success"/>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" gap={2}>
                                <Grid items xs={2}>
                                    <p>Average</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={20} color="warning"/>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" gap={2}>
                                <Grid items xs={2}>
                                    <p>Poor</p>
                                </Grid>
                                <Grid item xs={7}>
                                    <LinearProgress sx={{bgcolor:"#d0d0d0",borderRadius:4,height:7}} variant="determinate" value={15} color="error"/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </section>

        <section className='pt-10'>
            <h1> Similar products</h1>
        </section>
        
      </div>
    </div>
            </>
        ) :(
            <p>Nothing</p>
        )}
    </div>
    )
    // <div>
    //   {/* <h1>{product.title}</h1> */}
    //   <img src={product.imageUrl} alt={product.title} />
    //   <p>Brand: {product.brand}</p>
    //   <p>Price: {product.price}</p>
    //   <p>Description: {product.description}</p>
    //   {/* Render other product details */}
    // </div>
 // )
}

export default ItemDetails