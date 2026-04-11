# Laboratorio de Programación - Grupo 18

Repositorio con todos los trabajos prácticos realizados para la materia **Laboratorio de Programación** de la Licenciatura en Ciencias de la Computación y Licenciatura en Sistemas de la Información — Universidad Nacional del Comahue.

**Integrantes:** Fabris, Bugli y Barbieri

---

## TP 1 - Concurrencia y Patrones de Diseño

Investigación e implementación del patrón **Decorator** y el **ScheduledExecutorService con Delay** en Java.

El ejemplo práctico modela una panchería (kiosco de panchos) donde cada pancho base puede ser decorado dinámicamente con ingredientes adicionales (ketchup, mayonesa, papitas), y las ventas se simulan con tareas concurrentes programadas con delay.

### Estructura

```
TP1 - Concurrencia y Patrones de Diseño/
├── java-project/src/
│   ├── Panchitos/          # Clases del patrón Decorator (Pancho, Extra, Ketchup, Mayonesa, Papitas, Venta)
│   ├── ControlPancheria.java  # Orquesta las ventas con ScheduledExecutorService
│   └── Test.java           # Punto de entrada
├── DECORATOR.md            # Explicación del patrón Decorator
└── Scheduler_Executor_Service_con_Delay.md  # Explicación del Executor Service
```

### Cómo ejecutar

**Requisitos:** JDK 8 o superior.

```bash
cd "TP1 - Concurrencia y Patrones de Diseño/java-project/src"
javac Panchitos/*.java ControlPancheria.java Test.java
java Test
```

---

## TP 2 - Web Estática - Frontend

Sitio web estático de recetas de **Cocina Italiana**, construido con HTML y CSS puro, sin frameworks ni JavaScript.

### Estructura

```
TP2 - Web Estatica/
├── html/
│   ├── index.html          # Página principal con recetas destacadas
│   ├── recipe.html         # Página de detalle de receta genérica
│   └── recipeRisotto.html  # Página de detalle del Risotto
├── css/
├── img/
└── js/
```

### Cómo ejecutar

Abrir `html/index.html` directamente en el navegador. No requiere servidor.

---

## TP 3 - Web Dinámica - Backend

API REST construida con **Node.js y Express** que sirve las recetas de Cocina Italiana con soporte de paginado, filtrado por valoración y recetas similares. Incluye también el frontend dinámico servido como archivos estáticos.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/recipes` | Lista paginada de recetas (`?from=0&limit=6`) |
| GET | `/api/recipes/featured` | Recetas destacadas por valoración (`?limit=1`) |
| GET | `/api/recipes/:id` | Detalle de una receta por ID |
| GET | `/api/recipes/:id/similar` | Recetas similares a una dada |

### Estructura

```
TP3-Servidores-web/
├── public/                 # Frontend estático (HTML, CSS, JS, imágenes)
└── server/
    ├── server.js           # Punto de entrada
    └── app/
        ├── index.js        # Configuración de Express y rutas
        ├── routes/         # Definición de rutas
        ├── controllers/    # Lógica de cada endpoint
        ├── models/         # Acceso y filtrado de datos
        └── bd/
            └── recipes.json  # Base de datos en memoria (JSON)
```

### Cómo ejecutar

**Requisitos:** Node.js 18 o superior.

```bash
cd TP3-Servidores-web/server
npm install
npm start
```

El servidor queda disponible en `http://localhost:4000/cocinaItaliana`.

---

## TP 4 - Aplicación Móvil

Cliente mobile en **React Native + Expo** que consume la API del TP3.

> En desarrollo.
