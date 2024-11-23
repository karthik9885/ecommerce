
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import {  Radio, RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../state/product/Action'
import { addItemToCart } from '../../../state/cart/Action'

// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//     { id: 2, name: 'dress', href: '#' },

//   ],
//   images: [
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//       alt: 'Two each of gray, white, and black shirts laying flat.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  console.log("products in product details",products?.product);
  // const [selectedColor, setSelectedColor] = useState(products.product?.colors[0])
  const [selectedSize, setSelectedSize] = useState(products.product?.sizes[2])

  const handleAddToCart =()=>{
    const data = {productId:params.productId,size:selectedSize.name}
    console.log("data added to cart", data)
    dispatch(addItemToCart(data))
    navigate("/cart")
  }

  useEffect(()=>{
    const data ={productId: params.productId}
    console.log("params.productId",params.productId);
    console.log("data in product details",data);
    dispatch(findProductsById(data));
  },[params.productId])

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            
            <li className="text-sm">
              <a href={products.product?.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {products.product?.category?.name}
              </a>
            </li>
          </ol>
        </nav>

            <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
            {/* Image gallery */}
                <div className="flex flex-col items-center">
                <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                
                    <img
                    src={products.product?.imageUrl}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-wrap space-x-5 justify-center">
                {products.images?.map((item) =>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                    <img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover object-center"
                    />
                    </div> )}
                </div>
                </div>

                {/* Product info */}
        <div className="lg:col-span-1 maxt-auto max-w-2x1 px-4 pb-16 sm:px-6 lg:max-w-7x1 lg:max-w-7x1 lg:px-8 lg:pb-24">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-semibold text-gray-900">{products.product?.brand} </h1>
            <h1 className='text-lg lg:text-x1 text-gray-900 opacity-60 pt-1'>{products.product?.title} </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className='flex space-x-5 items-center text-lg lg:text-x1 text-grat-900 mt-6'>
                <p className='font-semibold'>₹{products.product?.discountedPrice}</p>
                <p className='opacity-50 line-through'>₹{products.product?.price}</p>
                <p className='text-green-600 font-semibold'>{products.product?.discountPercent}% off</p>

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
                    {products.product?.sizes.map((size) => (
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
                <p className="text-base text-gray-900">{products.product?.description}</p>
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
                <p className="text-sm text-gray-600">{products.product?.details}</p>
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
  )
}
