# Sistema de Recomendación de Rutas Turísticas en Prolog

## 1. Descripción del Problema

El turismo es una actividad que requiere planificación y toma de decisiones basadas en múltiples factores como presupuesto, tiempo disponible, preferencias personales y distancias entre destinos. Este proyecto implementa un sistema de recomendación de rutas turísticas en México que ayuda a los usuarios a planificar sus viajes de manera óptima según sus restricciones y preferencias.

El sistema permite:
- Buscar destinos según tipo (playa, arqueológico, urbano, etc.)
- Encontrar destinos donde realizar actividades específicas
- Calcular rutas óptimas entre destinos
- Recomendar itinerarios personalizados según presupuesto y tiempo disponible
- Encontrar combinaciones óptimas de destinos para un tiempo limitado

## 2. Hechos y Reglas Principales

### Hechos Base
1. **destino/4**: Representa los destinos turísticos con sus características.
   - Ejemplo: `destino(cancun, playa, alto, 5)`
   - Rol: Almacena la información básica de cada destino turístico.

2. **actividad/2**: Define las actividades disponibles en cada destino.
   - Ejemplo: `actividad(cancun, buceo)`
   - Rol: Permite buscar destinos según las actividades que el usuario desea realizar.

3. **distancia/3**: Establece las distancias entre destinos.
   - Ejemplo: `distancia(cancun, playa_del_carmen, 68)`
   - Rol: Proporciona la información necesaria para calcular rutas y optimizar itinerarios.

### Reglas Principales
1. **destino_adecuado/4**: Filtra destinos según preferencias.
   - Rol: Filtra destinos según tipo, presupuesto y tiempo disponible.

2. **ruta_entre/4**: Calcula rutas entre destinos.
   - Rol: Implementa la lógica de búsqueda de rutas con backtracking.

3. **ruta_mas_corta/4**: Encuentra la ruta óptima entre dos destinos.
   - Rol: Utiliza findall/3 para recopilar todas las rutas posibles y seleccionar la más corta.

## 3. Consultas de Ejemplo

### Consulta 1: Encontrar destinos de playa con presupuesto alto
```prolog
?- destino_adecuado(Destino, playa, alto, 5).
```
Respuesta:
```
Destino = playa_del_carmen
Destino = cancun
Destino = los_cabos
```

### Consulta 2: Encontrar la ruta más corta entre dos destinos
```prolog
?- ruta_mas_corta(playa_del_carmen, chichen_itza, Ruta, Distancia).
```
Respuesta:
```
Ruta = [playa_del_carmen, tulum, chichen_itza]
Distancia = 191
```

### Consulta 3: Buscar destinos que ofrezcan múltiples actividades
```prolog
?- destinos_con_actividades([playa, buceo], Destinos).
```
Respuesta:
```
Destinos = [cancun, playa_del_carmen]
```

### Consulta 4: Recomendar itinerario personalizado
```prolog
?- recomendar_itinerario(arqueologico, medio, 3, Itinerario).
```
Respuesta:
```
Itinerario = [tulum, chichen_itza]
```

### Consulta 5: Encontrar combinaciones de destinos que se ajusten a un tiempo disponible
```prolog
?- combinacion_destinos(2, 5, Combinacion, TiempoTotal).
```
Respuesta:
```
Combinacion = [playa_del_carmen, cancun]
TiempoTotal = 9
```

## 4. Árbol de Búsqueda

Para la consulta `ruta_mas_corta(playa_del_carmen, chichen_itza, Ruta, Distancia)`, el árbol de búsqueda sería:

```
ruta_mas_corta(playa_del_carmen, chichen_itza, Ruta, Distancia)
    |
    ├── ruta_entre(playa_del_carmen, chichen_itza, [playa_del_carmen, chichen_itza], 197)
    |   └── distancia(playa_del_carmen, chichen_itza, 197)
    |
    ├── ruta_entre(playa_del_carmen, chichen_itza, [playa_del_carmen, cancun, chichen_itza], 265)
    |   ├── distancia(playa_del_carmen, cancun, 68)
    |   └── ruta_entre(cancun, chichen_itza, [cancun, chichen_itza], 197)
    |
    └── ruta_entre(playa_del_carmen, chichen_itza, [playa_del_carmen, tulum, chichen_itza], 191)
        ├── distancia(playa_del_carmen, tulum, 63)
        └── ruta_entre(tulum, chichen_itza, [tulum, chichen_itza], 128)
```

El backtracking ocurre cuando Prolog:
1. Intenta la ruta directa (197 km)
2. Backtrack y prueba vía Cancún (265 km)
3. Backtrack y prueba vía Tulum (191 km)
4. Selecciona la ruta más corta (vía Tulum)

## 5. Instrucciones de Ejecución

1. Asegúrese de tener SWI-Prolog instalado en su sistema
2. Abra una terminal en el directorio del proyecto
3. Ejecute el programa:
   ```
   swipl rutas_turisticas.pl
   ```
4. Inicie el sistema:
   ```
   ?- inicio.
   ```
5. Siga las instrucciones del menú interactivo

### Ejemplos de Uso

1. Buscar destinos por tipo:
   ```
   Opción: 1
   Tipo: playa
   Presupuesto: alto
   Tiempo: 5
   ```

2. Buscar destinos por actividad:
   ```
   Opción: 2
   Actividad: buceo
   ```

3. Encontrar ruta entre destinos:
   ```
   Opción: 3
   Origen: playa_del_carmen
   Destino: chichen_itza
   ```
