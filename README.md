# FakeStore E-commerce Frontend

Una aplicación web moderna de comercio electrónico construida con React y TypeScript que interactúa con la FakeStore API.

## 🚀 Características

- **Listado de Productos**: Visualización de productos en una cuadrícula responsive con imágenes, precios y descripciones.
- **Detalles del Producto**: Página detallada para cada producto con información completa.
- **Creación de Productos**: Formulario para agregar nuevos productos al catálogo.
- **Diseño Responsive**: Interfaz adaptativa que funciona en dispositivos móviles y de escritorio.
- **UI Moderna**: Interfaz de usuario moderna construida con Tailwind CSS.

## 🛠️ Tecnologías Utilizadas

- React 18+
- TypeScript
- React Router v6
- Tailwind CSS
- Axios
- FakeStore API

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🎯 Estructura del Proyecto

```
src/
├── components/
│   ├── ProductList.tsx    # Lista de productos
│   ├── ProductDetail.tsx  # Detalles del producto
│   └── CreateProduct.tsx  # Formulario de creación
├── lib/
│   └── api.ts            # Servicios de API
├── App.tsx               # Componente principal
└── main.tsx             # Punto de entrada
```

## 🌟 Características Principales

### Navegación
- Barra de navegación responsive con logo y menú
- Enlaces a la lista de productos y creación de productos
- Menú hamburguesa para dispositivos móviles

### Lista de Productos
- Grid responsive de productos
- Imágenes de productos con fallback
- Precios y descripciones
- Estado de carga y manejo de errores

### Detalles del Producto
- Vista detallada con imagen grande
- Información completa del producto
- Sistema de calificación visual
- Botón de "Añadir al carrito"

### Creación de Productos
- Formulario completo para nuevos productos
- Validación de campos
- Categorías predefinidas
- Manejo de errores y estados de carga

## 🎨 UI/UX

- Diseño moderno y limpio
- Animaciones suaves
- Estados de carga con skeletons
- Mensajes de error claros
- Footer con información de copyright y enlaces sociales

## 🔧 Configuración

El proyecto utiliza las siguientes configuraciones principales:

- Tailwind CSS para estilos
- React Router para navegación
- Axios para peticiones HTTP
- TypeScript para type safety

## 📱 Responsive Design

- Diseño adaptable a diferentes tamaños de pantalla
- Menú hamburguesa para móviles
- Grid responsive para productos
- Imágenes optimizadas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
