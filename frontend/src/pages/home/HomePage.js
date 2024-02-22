import React from 'react'
import Header from '../../components/layout/Header'
import Hero from '../../components/routes/Hero'
import Categories from '../../components/routes/Categories'
import BestDeals from '../../components/routes/BestDeals'
import FeaturedProducts from '../../components/routes/FeaturedProducts'
import Events from '../../components/events/Events'
import Sponsored from '../../components/routes/Sponsored'
import Footer from '../../components/layout/Footer'

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <BestDeals />
        <FeaturedProducts />
        <Events />
        <Sponsored />
        <Footer />
    </div>
  )
}

export default HomePage