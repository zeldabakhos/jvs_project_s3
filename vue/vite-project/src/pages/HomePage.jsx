import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../utils/fetchProducts.js'
import ProductList from '../components/RenderProducts.jsx'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data?.products || []) 
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const addToCart = (productId) => {
    // implement your cart logic here
    console.log(`Product ${productId} added to cart`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!products || products.length === 0) return <p>No products found</p>

  return (
    <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <ProductList products={products} addToCart={addToCart} />
    </section>
  )
}

export default HomePage
