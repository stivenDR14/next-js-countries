# REST Countries API - Reto Técnico

Este proyecto es una solución al reto técnico de consumir la [REST Countries API](https://restcountries.com/) para mostrar información de países, desarrollado con **Next.js 15**, **TypeScript**, y **Material-UI**.

La aplicación permite a los usuarios:

- Ver una lista de todos los países.
- Filtrar países por nombre y región.
- Ver una página de detalle para cada país.
- Cambiar entre tema claro y oscuro.

## 🏛️ Arquitectura y Principios

La solución se desarrolló siguiendo principios de **Arquitectura Limpia** y **SOLID** para garantizar un código mantenible, escalable y desacoplado.

### Estructura de Carpetas

La estructura del proyecto separa las responsabilidades de la siguiente manera:

- `src/app/`: Contiene las páginas y rutas de la aplicación, siguiendo el App Router de Next.js.
  - `api/`: Endpoints de la API interna que actúan como backend-for-frontend.
- `src/components/`: Componentes de React reutilizables y atómicos.
- `src/hooks/`: Hooks personalizados para manejar lógica de estado y efectos.
- `src/types/`: Definiciones de tipos y entidades de TypeScript.
- `src/utils/`: Funciones de utilidad y mappers para transformar datos.
- `src/theme/`: Configuración de temas claro y oscuro con Material-UI.

## ✨ Características y Soluciones Técnicas

### 1. **Optimización de Performance**

Para garantizar una experiencia de usuario fluida y rápida, se implementaron varias estrategias de optimización.

#### **Static Site Generation (SSG) con Incremental Static Regeneration (ISR)**

La página principal de países se genera estáticamente en el momento del build y se revalida cada **12 horas**.

- **Cómo funciona**: La primera visita a la página sirve un HTML estático. Las visitas posteriores reciben la misma página cacheada. Después de 12 horas, la siguiente petición regenerará la página en segundo plano con datos frescos, garantizando que el contenido esté actualizado sin sacrificar la velocidad de carga.
- **Implementación**: Se utiliza `fetch` de Next.js con la opción `{ next: { revalidate: 43200 } }` en el componente servidor `src/app/page.tsx`.

#### **Listas Virtualizadas**

Para renderizar la larga lista de países de manera eficiente, se implementó una lista virtualizada.

- **Problema**: Renderizar más de 250 tarjetas de países a la vez puede causar problemas de rendimiento en el navegador.
- **Solución**: Se utilizó un hook personalizado (`use-virtualize`) que solo renderiza los elementos que son visibles en la pantalla del usuario en un momento dado, manteniendo la aplicación rápida y responsiva.
- **Layout Responsivo**: La virtualización se adapta al número de columnas (1 en móvil, 2 en tablet, 4 en desktop) para un rendimiento óptimo en todos los dispositivos.

### 2. **Manejo de Datos y Estado**

#### **Hooks Personalizados**

Se crearon hooks específicos para encapsular la lógica de fetching, carga y manejo de errores.

- `useCountryDetail`: Hook para la página de detalle, que gestiona el estado de carga y los errores, incluyendo un timeout de 10 segundos para las peticiones.

#### **Mappers de Datos**

Para desacoplar la aplicación de la estructura de datos de la API externa, se implementaron _mappers_.

- **Propósito**: Transforman la respuesta de `restcountries.com` a las entidades internas de la aplicación (`Country` y `CountryDetail`).
- **Beneficio**: Si la API externa cambia, solo es necesario actualizar los mappers en `src/utils/countries-info.ts` sin afectar el resto de la aplicación.

### 3. **Experiencia de Usuario (UX)**

#### **Diseño Responsivo**

La interfaz se diseñó con un enfoque _mobile-first_ y se adapta a cualquier tamaño de pantalla, desde teléfonos pequeños hasta monitores de escritorio grandes, utilizando el sistema de Grid y breakpoints de Material-UI.

#### **Tema Claro y Oscuro**

La aplicación incluye un selector de tema que permite al usuario cambiar entre un modo claro y oscuro. El tema seleccionado se persiste en el `localStorage` del navegador.

#### **Feedback al Usuario**

- **Indicadores de Carga**: Se muestran `CircularProgress` mientras los datos se están cargando.
- **Manejo de Errores**: Se utilizan componentes `Alert` y `Snackbar` para notificar al usuario si ocurre un error al obtener los datos.

### 4. **Pruebas Unitarias con Vitest**

Para asegurar la calidad y el correcto funcionamiento de la lógica de negocio, se implementaron pruebas unitarias utilizando **Vitest**.

- **Entorno de Pruebas**: Se configuró un entorno de pruebas con `jsdom` para simular el DOM del navegador y `@testing-library/react` para probar hooks y componentes.
- **Lógica Probada**:
  - **Mappers de Datos**: Se crearon pruebas para las funciones en `src/utils/countries-info.ts` para garantizar que los datos de la API externa se transformen correctamente a las entidades de la aplicación.
  - **Hooks Personalizados**: Se probó el hook `use-theme-mode` para verificar que el cambio de tema y la persistencia en `localStorage` funcionen como se espera.

## 🚀 Cómo Empezar

### Requisitos

- Node.js (versión 20 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/next-js-countries.git
   cd next-js-countries
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecutar en Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Abre [http://localhost:3201](http://localhost:3201) en tu navegador para ver la aplicación.

### Construir para Producción

Para crear una versión optimizada para producción, ejecuta:

```bash
npm run build
```

Este comando generará los archivos estáticos de la aplicación en la carpeta `.next`.

### Ejecutar las Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
npm test
```

Esto iniciará Vitest en modo "watch", volviendo a ejecutar las pruebas automáticamente cada vez que se detecte un cambio en los archivos.
