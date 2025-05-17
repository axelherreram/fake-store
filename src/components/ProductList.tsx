"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "@/lib/api"
import type { Product } from "@/lib/api"

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError("Error loading products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="h-48 bg-gray-100 animate-pulse" />
              <div className="h-6 bg-gray-100 animate-pulse mt-4 w-3/4" />
              <div className="h-4 bg-gray-100 animate-pulse mt-2 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Product
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mt-2">
                {product.category}
              </span>
              <p className="text-gray-500 line-clamp-2 text-sm mt-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
                <Link to={`/product/${product.id}`}>
                  <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">Start by adding your first product</p>
          <Link to="/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add New Product
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
