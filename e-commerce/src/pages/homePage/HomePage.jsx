import React from 'react'
import HomeSectionCarousel from '../../customer/components/homeSectionCarousel/HomeSectionCarousel'
import MainCarousel from '../../customer/components/homecarousel/MainCarousel'
import { mens_kurta } from '../../data/mens_kurta'
import { mens_jeans } from '../../data/mens_jeans'
import { mens_shirts } from '../../data/mens_shirts'
import { mens_shoes } from '../../data/mens_shoes'
import { womens_dress } from '../../data/womens_dress'

const HomePage = () => {
  return (
    <div>
        <MainCarousel />
        <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
            <HomeSectionCarousel  data={mens_kurta} sectionName={"Men's Kurta"}/> 
            <HomeSectionCarousel data={mens_jeans} sectionName={"Men's Jeans"}/> 
            <HomeSectionCarousel data={mens_shoes} sectionName={"Men's Shoes"}/> 
            <HomeSectionCarousel data={mens_shirts} sectionName={"Men's Shirts"}/> 
            <HomeSectionCarousel data={womens_dress} sectionName={"Women's Dress"}/> 
        </div>
    </div>
  )
}

export default HomePage