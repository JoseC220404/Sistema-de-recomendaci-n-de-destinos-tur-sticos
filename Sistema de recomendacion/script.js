document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    initMap();
    
    // Configurar las pestañas
    setupTabs();
    
    // Configurar los formularios
    setupForms();
});

// Coordenadas de los destinos turísticos (aproximadas)
const destinosCoords = {
    playa_del_carmen: [20.6296, -87.0739],
    chichen_itza: [20.6843, -88.5677],
    ciudad_de_mexico: [19.4326, -99.1332],
    oaxaca: [17.0732, -96.7266],
    cancun: [21.1619, -86.8515],
    palenque: [17.4848, -92.0430],
    guanajuato: [21.0190, -101.2574],
    los_cabos: [22.8905, -109.9167],
    cuernavaca: [18.9242, -99.2216],
    tulum: [20.2114, -87.4654]
};

// Información de los destinos
const destinosInfo = {
    playa_del_carmen: {
        nombre: "Playa del Carmen",
        tipo: "playa",
        precio: "alto",
        tiempo: 4,
        actividades: ["snorkel", "buceo", "fiesta"],
        descripcion: "Hermoso destino de playa en la Riviera Maya con aguas cristalinas."
    },
    chichen_itza: {
        nombre: "Chichén Itzá",
        tipo: "arqueologico",
        precio: "medio",
        tiempo: 2,
        actividades: ["tour_guiado", "fotografia"],
        descripcion: "Impresionante zona arqueológica maya, una de las 7 maravillas del mundo moderno."
    },
    ciudad_de_mexico: {
        nombre: "Ciudad de México",
        tipo: "urbano",
        precio: "medio",
        tiempo: 3,
        actividades: ["museos", "gastronomia", "compras"],
        descripcion: "La capital de México, rica en historia, cultura y gastronomía."
    },
    oaxaca: {
        nombre: "Oaxaca",
        tipo: "cultural",
        precio: "bajo",
        tiempo: 2,
        actividades: ["gastronomia", "artesania"],
        descripcion: "Famosa por su rica tradición culinaria y artesanal."
    },
    cancun: {
        nombre: "Cancún",
        tipo: "playa",
        precio: "alto",
        tiempo: 5,
        actividades: ["playa", "fiesta", "buceo"],
        descripcion: "Destino turístico internacional con hermosas playas de arena blanca."
    },
    palenque: {
        nombre: "Palenque",
        tipo: "arqueologico",
        precio: "bajo",
        tiempo: 3,
        actividades: ["tour_guiado", "senderismo"],
        descripcion: "Impresionante sitio arqueológico maya rodeado de selva."
    },
    guanajuato: {
        nombre: "Guanajuato",
        tipo: "colonial",
        precio: "bajo",
        tiempo: 2,
        actividades: ["tour_guiado", "fotografia"],
        descripcion: "Hermosa ciudad colonial con callejones y arquitectura colorida."
    },
    los_cabos: {
        nombre: "Los Cabos",
        tipo: "playa",
        precio: "alto",
        tiempo: 4,
        actividades: ["pesca", "playa"],
        descripcion: "Destino de lujo donde el desierto se encuentra con el mar."
    },
    cuernavaca: {
        nombre: "Cuernavaca",
        tipo: "urbano",
        precio: "medio",
        tiempo: 1,
        actividades: ["descanso"],
        descripcion: "Conocida como la ciudad de la eterna primavera por su clima agradable."
    },
    tulum: {
        nombre: "Tulum",
        tipo: "arqueologico",
        precio: "medio",
        tiempo: 2,
        actividades: ["playa", "tour_guiado"],
        descripcion: "Ruinas mayas frente al mar Caribe con playas espectaculares."
    }
};

// Distancias entre destinos
const distancias = {
    "playa_del_carmen-cancun": 68,
    "playa_del_carmen-tulum": 63,
    "cancun-chichen_itza": 197,
    "tulum-chichen_itza": 128,
    "ciudad_de_mexico-cuernavaca": 85,
    "ciudad_de_mexico-oaxaca": 462,
    "ciudad_de_mexico-guanajuato": 363,
    "oaxaca-palenque": 570,
    "guanajuato-los_cabos": 1680
};

// Función para obtener la distancia entre dos destinos
function getDistancia(origen, destino) {
    const key1 = `${origen}-${destino}`;
    const key2 = `${destino}-${origen}`;
    
    if (distancias[key1] !== undefined) {
        return distancias[key1];
    } else if (distancias[key2] !== undefined) {
        return distancias[key2];
    }
    
    return null; // No hay conexión directa
}

// Inicializar el mapa
function initMap() {
    const map = L.map('map').setView([23.6345, -102.5528], 5); // Centro en México
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Añadir marcadores para cada destino
    for (const destino in destinosCoords) {
        const marker = L.marker(destinosCoords[destino]).addTo(map);
        marker.bindPopup(`
            <strong>${destinosInfo[destino].nombre}</strong><br>
            Tipo: ${destinosInfo[destino].tipo}<br>
            Precio: ${destinosInfo[destino].precio}<br>
            Tiempo recomendado: ${destinosInfo[destino].tiempo} días<br>
            <em>${destinosInfo[destino].descripcion}</em>
        `);
    }
}

// Configurar las pestañas
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Desactivar todas las pestañas
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Activar la pestaña seleccionada
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Configurar los formularios
function setupForms() {
    // Formulario de búsqueda por tipo
    document.getElementById('type-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const presupuesto = document.getElementById('presupuesto').value;
        const tiempo = parseInt(document.getElementById('tiempo').value);
        
        const resultados = buscarPorTipo(tipo, presupuesto, tiempo);
        mostrarResultados('type-results', resultados, 'Destinos recomendados');
    });
    
    // Formulario de búsqueda por actividad
    document.getElementById('activity-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const actividad = document.getElementById('actividad').value;
        
        const resultados = buscarPorActividad(actividad);
        mostrarResultados('activity-results', resultados, 'Destinos con esta actividad');
    });
    
    // Formulario de búsqueda de ruta
    document.getElementById('route-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        
        const resultado = buscarRuta(origen, destino);
        mostrarRuta('route-results', resultado);
    });
    
    // Formulario de itinerario personalizado
    document.getElementById('itinerary-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo-itinerario').value;
        const presupuesto = document.getElementById('presupuesto-itinerario').value;
        const tiempo = parseInt(document.getElementById('tiempo-itinerario').value);
        
        const resultados = buscarPorTipo(tipo, presupuesto, tiempo);
        mostrarResultados('itinerary-results', resultados, 'Itinerario recomendado');
    });
    
    // Formulario de combinaciones de destinos
    document.getElementById('combination-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const numDestinos = parseInt(document.getElementById('num-destinos').value);
        const tiempoMax = parseInt(document.getElementById('tiempo-max').value);
        
        const combinaciones = buscarCombinaciones(numDestinos, tiempoMax);
        mostrarCombinaciones('combination-results', combinaciones);
    });
}

// Función para buscar destinos por tipo
function buscarPorTipo(tipo, presupuesto, tiempo) {
    const resultados = [];
    
    for (const destino in destinosInfo) {
        const info = destinosInfo[destino];
        
        if (info.tipo === tipo && 
            tiempoSuficiente(tiempo, info.tiempo) && 
            presupuestoSuficiente(presupuesto, info.precio)) {
            resultados.push(destino);
        }
    }
    
    return resultados;
}

// Función para verificar si el tiempo es suficiente
function tiempoSuficiente(disponible, requerido) {
    return disponible >= requerido;
}

// Función para verificar si el presupuesto es suficiente
function presupuestoSuficiente(presupuesto, nivelPrecio) {
    if (presupuesto === 'alto') return true;
    if (presupuesto === 'medio' && (nivelPrecio === 'medio' || nivelPrecio === 'bajo')) return true;
    if (presupuesto === 'bajo' && nivelPrecio === 'bajo') return true;
    return false;
}

// Función para buscar destinos por actividad
function buscarPorActividad(actividad) {
    const resultados = [];
    
    for (const destino in destinosInfo) {
        const info = destinosInfo[destino];
        
        if (info.actividades.includes(actividad)) {
            resultados.push(destino);
        }
    }
    
    return resultados;
}

// Función para buscar ruta entre destinos
function buscarRuta(origen, destino) {
    // Verificar si hay una ruta directa
    const distanciaDirecta = getDistancia(origen, destino);
    if (distanciaDirecta !== null) {
        return {
            ruta: [origen, destino],
            distancia: distanciaDirecta
        };
    }
    
    // Buscar rutas con un destino intermedio
    let mejorRuta = null;
    let menorDistancia = Infinity;
    
    for (const intermedio in destinosInfo) {
        if (intermedio !== origen && intermedio !== destino) {
            const dist1 = getDistancia(origen, intermedio);
            const dist2 = getDistancia(intermedio, destino);
            
            if (dist1 !== null && dist2 !== null) {
                const distanciaTotal = dist1 + dist2;
                
                if (distanciaTotal < menorDistancia) {
                    menorDistancia = distanciaTotal;
                    mejorRuta = {
                        ruta: [origen, intermedio, destino],
                        distancia: distanciaTotal
                    };
                }
            }
        }
    }
    
    return mejorRuta;
}

// Función para buscar combinaciones de destinos
function buscarCombinaciones(numDestinos, tiempoMax) {
    const combinaciones = [];
    const destinos = Object.keys(destinosInfo);
    
    // Función recursiva para generar combinaciones
    function generarCombinaciones(start, combo) {
        if (combo.length === numDestinos) {
            const tiempoTotal = calcularTiempoTotal(combo);
            if (tiempoTotal <= tiempoMax) {
                combinaciones.push({
                    destinos: combo.slice(),
                    tiempo: tiempoTotal
                });
            }
            return;
        }
        
        for (let i = start; i < destinos.length; i++) {
            combo.push(destinos[i]);
            generarCombinaciones(i + 1, combo);
            combo.pop();
        }
    }
    
    generarCombinaciones(0, []);
    return combinaciones;
}

// Función para calcular el tiempo total de una lista de destinos
function calcularTiempoTotal(listaDestinos) {
    let total = 0;
    for (const destino of listaDestinos) {
        total += destinosInfo[destino].tiempo;
    }
    return total;
}

// Función para mostrar resultados en la interfaz
function mostrarResultados(elementId, resultados, titulo) {
    const element = document.getElementById(elementId);
    
    if (resultados.length === 0) {
        element.innerHTML = '<p>No se encontraron resultados que cumplan con los criterios.</p>';
        return;
    }
    
    let html = `<h4>${titulo}</h4><ul>`;
    
    for (const destino of resultados) {
        const info = destinosInfo[destino];
        html += `
            <li>
                <strong>${info.nombre}</strong> - 
                Tipo: ${info.tipo}, 
                Precio: ${info.precio}, 
                Tiempo: ${info.tiempo} días
            </li>
        `;
    }
    
    html += '</ul>';
    element.innerHTML = html;
}

// Función para mostrar ruta en la interfaz
function mostrarRuta(elementId, resultado) {
    const element = document.getElementById(elementId);
    
    if (!resultado) {
        element.innerHTML = '<p>No se encontró una ruta entre esos destinos.</p>';
        return;
    }
    
    let html = `<h4>Ruta más corta</h4><div class="route-container">`;
    
    for (let i = 0; i < resultado.ruta.length; i++) {
        const destino = resultado.ruta[i];
        const info = destinosInfo[destino];
        
        html += `<div class="route-item"><span>${info.nombre}</span></div>`;
        
        if (i < resultado.ruta.length - 1) {
            const nextDestino = resultado.ruta[i + 1];
            const distancia = getDistancia(destino, nextDestino);
            html += `<div class="route-arrow">→ ${distancia} km →</div>`;
        }
    }
    
    html += `</div><p>Distancia total: ${resultado.distancia} km</p>`;
    element.innerHTML = html;
}

// Función para mostrar combinaciones en la interfaz
function mostrarCombinaciones(elementId, combinaciones) {
    const element = document.getElementById(elementId);
    
    if (combinaciones.length === 0) {
        element.innerHTML = '<p>No se encontraron combinaciones que cumplan con los criterios.</p>';
        return;
    }
    
    let html = `<h4>Combinaciones posibles</h4>`;
    
    for (let i = 0; i < Math.min(5, combinaciones.length); i++) { // Mostrar máximo 5 combinaciones
        const combo = combinaciones[i];
        html += `<div class="combination-item"><h5>Combinación ${i+1}</h5><ul>`;
        
        for (const destino of combo.destinos) {
            const info = destinosInfo[destino];
            html += `<li>${info.nombre} (${info.tiempo} días)</li>`;
        }
        
        html += `</ul><p>Tiempo total: ${combo.tiempo} días</p></div>`;
    }
    
    if (combinaciones.length > 5) {
        html += `<p>Se encontraron ${combinaciones.length} combinaciones en total. Mostrando las primeras 5.</p>`;
    }
    
    element.innerHTML = html;
}