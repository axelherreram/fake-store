"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "@/lib/api"
import type { Product } from "@/lib/api"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleBack = () => {
    navigate("/")
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) throw new Error("No product ID provided")
        const data = await api.getProduct(parseInt(id))
        setProduct(data)
        setLoading(false)
      } catch (err) {
        setError("Error loading product")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <button onClick={handleBack} className="mb-6 text-gray-600 hover:text-gray-900">
          ← Back to Products
        </button>
        <div className="border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 h-[400px] animate-pulse rounded-md" />
            <div className="space-y-6">
              <div className="h-10 bg-gray-100 animate-pulse w-3/4 rounded" />
              <div className="h-8 bg-gray-100 animate-pulse w-1/3 rounded" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 animate-pulse w-full rounded" />
                <div className="h-4 bg-gray-100 animate-pulse w-full rounded" />
                <div className="h-4 bg-gray-100 animate-pulse w-2/3 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <button onClick={handleBack} className="mb-6 text-gray-600 hover:text-gray-900">
          ← Back to Products
        </button>
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

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <button onClick={handleBack} className="mb-6 text-gray-600 hover:text-gray-900">
          ← Back to Products
        </button>
        <div className="border rounded-lg p-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={handleBack}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <button onClick={handleBack} className="mb-6 text-gray-600 hover:text-gray-900">
        ← Back to Products
      </button>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="bg-gray-50 rounded-md flex items-center justify-center p-6">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="max-h-[400px] max-w-full object-contain"
            />
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold">{product.title}</h1>
            </div>

            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>

            <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="pt-4">
              <button className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>

            <div className="text-sm text-gray-500">
              <p>• Free shipping on orders over $50</p>
              <p>• 30-day money-back guarantee</p>
              <p>• 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
