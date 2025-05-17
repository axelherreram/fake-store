"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "@/lib/api"
import type { Product } from "@/lib/api"

const ITEMS_PER_PAGE = 8

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError("Error al cargar los productos")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Productos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
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
          Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Link to="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Agregar Producto
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
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
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No se encontraron productos</h2>
          <p className="text-gray-500 mb-6">Comienza agregando tu primer producto</p>
          <Link to="/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Agregar Producto
            </button>
          </Link>
        </div>
      )}

      {/* Paginación */}
      {products.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Página anterior"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              const isCurrentPage = pageNumber === currentPage
              const isNearCurrentPage = 
                Math.abs(pageNumber - currentPage) <= 1 || 
                pageNumber === 1 || 
                pageNumber === totalPages

              if (!isNearCurrentPage) {
                if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return <span key={pageNumber} className="px-2">...</span>
                }
                return null
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-md ${
                    isCurrentPage
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label={`Ir a página ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              )
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Página siguiente"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
