import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductDetails from '../components/productdetails/ProductDetails'
import { useParams, useSearchParams } from 'react-router-dom'
import SuggestedProducts from '../components/productdetails/SuggestedProducts'
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [data, setData] = useState(null);
  console.log("PRODETAILSPAGE", data)

  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { id } = useParams();

   useEffect(() => {
     if(eventData !== null) {
      const data = allEvents && allEvents.find(i => i._id === id)
      setData(data)
    } else {
      const data = allProducts && allProducts.find(i => i._id === id)
      setData(data)
     }
   }, [allProducts, allEvents])
   

  return (
    <div>
        <Header />
        <ProductDetails data={data} />
        {
          !eventData && ( <>  <SuggestedProducts data={data} /> </>)
        }
       
        <Footer />
    </div>
  )
}

export default ProductDetailsPage