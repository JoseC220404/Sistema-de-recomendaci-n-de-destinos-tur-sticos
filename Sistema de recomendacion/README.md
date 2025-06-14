# Sistema de Recomendación de Rutas Turísticas

Este proyecto implementa una interfaz web para un sistema de recomendación de rutas turísticas en México desarrollado en Prolog. La interfaz permite a los usuarios interactuar de manera intuitiva con el sistema, visualizar los destinos en un mapa interactivo y obtener recomendaciones personalizadas.

## Características

- **Visualización de destinos**: Mapa interactivo con todos los destinos turísticos disponibles.
- **Búsqueda por tipo**: Encuentra destinos según su tipo (playa, arqueológico, urbano, etc.).
- **Búsqueda por actividad**: Descubre destinos donde realizar actividades específicas.
- **Cálculo de rutas**: Encuentra la ruta más corta entre dos destinos.
- **Itinerarios personalizados**: Recibe recomendaciones según tus preferencias, presupuesto y tiempo disponible.
- **Combinaciones de destinos**: Encuentra combinaciones óptimas de destinos para un tiempo limitado.

## Estructura del Proyecto

- `index.html`: Página principal de la interfaz web.
- `styles.css`: Estilos CSS para la interfaz.
- `script.js`: Lógica JavaScript para la interactividad y simulación del sistema Prolog.
- `rutas_turisticas.pl`: Sistema de recomendación implementado en Prolog.
- `informe_proyecto.md`: Documentación detallada del proyecto.

## Cómo usar la interfaz web

1. Abre el archivo `index.html` en tu navegador web.
2. Explora el mapa para ver todos los destinos disponibles.
3. Utiliza las diferentes pestañas para realizar consultas específicas:
   - **Buscar por tipo**: Selecciona un tipo de destino, presupuesto y tiempo disponible.
   - **Buscar por actividad**: Selecciona una actividad que desees realizar.
   - **Buscar ruta**: Selecciona un origen y un destino para encontrar la ruta más corta.
   - **Itinerario personalizado**: Obtén recomendaciones basadas en tus preferencias.
   - **Combinaciones de destinos**: Encuentra combinaciones óptimas para tu tiempo disponible.

## Integración con Prolog

La interfaz web actualmente simula la funcionalidad del sistema Prolog mediante JavaScript. Para una integración completa con el sistema Prolog original, se requeriría implementar un servidor que ejecute las consultas Prolog y devuelva los resultados a la interfaz web.

## Requisitos

- Navegador web moderno con soporte para JavaScript.
- Para la visualización del mapa se requiere conexión a internet (utiliza OpenStreetMap).

## Desarrollo Futuro

- Implementar la integración completa con el sistema Prolog mediante un servidor.
- Añadir más destinos y actividades turísticas.
- Mejorar el algoritmo de cálculo de rutas para considerar más de un destino intermedio.
- Añadir información detallada sobre cada destino (imágenes, reseñas, etc.).
-