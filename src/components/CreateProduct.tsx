"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "@/lib/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CrearProducto() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  })

  const categorias = [
    "Electrónica",
    "Ropa",
    "Hogar y Cocina",
    "Libros",
    "Belleza",
    "Juguetes",
    "Deportes",
    "Automotriz",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const nuevoProducto = {
        ...formData,
        price: Number.parseFloat(formData.price),
      }

      await api.createProduct(nuevoProducto)
      navigate("/")
    } catch (err) {
      setError("Error al crear el producto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Crear Nuevo Producto</CardTitle>
          <CardDescription>Agrega un nuevo producto a tu inventario</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Nombre del Producto</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ingresa el nombre del producto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe el producto"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria.toLowerCase()}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de la Imagen</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Creando..." : "Crear Producto"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
