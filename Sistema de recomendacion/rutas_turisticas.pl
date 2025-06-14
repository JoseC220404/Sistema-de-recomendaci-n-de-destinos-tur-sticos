% Base de conocimiento: Destinos turisticos
% destino(Nombre, Tipo, NivelPrecio, TiempoRecomendado).
destino(playa_del_carmen, playa, alto, 4).
destino(chichen_itza, arqueologico, medio, 2).
destino(ciudad_de_mexico, urbano, medio, 3).
destino(oaxaca, cultural, bajo, 2).
destino(cancun, playa, alto, 5).
destino(palenque, arqueologico, bajo, 3).
destino(guanajuato, colonial, bajo, 2).
destino(los_cabos, playa, alto, 4).
destino(cuernavaca, urbano, medio, 1).
destino(tulum, arqueologico, medio, 2).

% Actividades disponibles en cada destino
% actividad(Destino, Actividad).
actividad(playa_del_carmen, snorkel).
actividad(playa_del_carmen, buceo).
actividad(playa_del_carmen, fiesta).
actividad(chichen_itza, tour_guiado).
actividad(chichen_itza, fotografia).
actividad(ciudad_de_mexico, museos).
actividad(ciudad_de_mexico, gastronomia).
actividad(ciudad_de_mexico, compras).
actividad(oaxaca, gastronomia).
actividad(oaxaca, artesania).
actividad(cancun, playa).
actividad(cancun, fiesta).
actividad(cancun, buceo).
actividad(palenque, tour_guiado).
actividad(palenque, senderismo).
actividad(guanajuato, tour_guiado).
actividad(guanajuato, fotografia).
actividad(los_cabos, pesca).
actividad(los_cabos, playa).
actividad(cuernavaca, descanso).
actividad(tulum, playa).
actividad(tulum, tour_guiado).

% Distancias entre destinos en kilometros
% distancia(Origen, Destino, Kilometros).
distancia(playa_del_carmen, cancun, 68).
distancia(playa_del_carmen, tulum, 63).
distancia(cancun, chichen_itza, 197).
distancia(tulum, chichen_itza, 128).
distancia(ciudad_de_mexico, cuernavaca, 85).
distancia(ciudad_de_mexico, oaxaca, 462).
distancia(ciudad_de_mexico, guanajuato, 363).
distancia(oaxaca, palenque, 570).
distancia(guanajuato, los_cabos, 1680).

% Regla para hacer la distancia bidireccional
distancia(A, B, D) :- distancia(B, A, D).

% Regla para determinar si un destino es adecuado segun preferencias
destino_adecuado(Destino, TipoPreferido, PresupuestoMax, TiempoDisponible) :-
    destino(Destino, TipoPreferido, NivelPrecio, TiempoRequerido),
    tiempo_suficiente(TiempoDisponible, TiempoRequerido),
    presupuesto_suficiente(PresupuestoMax, NivelPrecio).

% Reglas auxiliares para evaluar tiempo y presupuesto
tiempo_suficiente(Disponible, Requerido) :- Disponible >= Requerido.

presupuesto_suficiente(alto, _).
presupuesto_suficiente(medio, medio).
presupuesto_suficiente(medio, bajo).
presupuesto_suficiente(bajo, bajo).

% Regla para encontrar destinos con actividades especificas
destino_con_actividad(Destino, Actividad) :-
    destino(Destino, _, _, _),
    actividad(Destino, Actividad).

% Regla para encontrar ruta entre destinos
ruta_entre(Origen, Destino, [Origen, Destino], Distancia) :-
    distancia(Origen, Destino, Distancia).

ruta_entre(Origen, Destino, [Origen, Intermedio, Destino], DistanciaTotal) :-
    distancia(Origen, Intermedio, D1),
    distancia(Intermedio, Destino, D2),
    Origen \= Intermedio,
    Intermedio \= Destino,
    DistanciaTotal is D1 + D2.

% Regla para encontrar la ruta más corta
ruta_mas_corta(Origen, Destino, Ruta, Distancia) :-
    ruta_entre(Origen, Destino, Ruta, Distancia),
    \+ (ruta_entre(Origen, Destino, OtraRuta, OtraDistancia),
        OtraDistancia < Distancia).

% Regla para recomendar itinerario basado en preferencias
recomendar_itinerario(TipoPreferido, PresupuestoMax, TiempoDisponible, Itinerario) :-
    findall(Destino, destino_adecuado(Destino, TipoPreferido, PresupuestoMax, TiempoDisponible), Destinos),
    length(Destinos, Cantidad),
    Cantidad > 0,
    Itinerario = Destinos.

% Regla para encontrar todos los destinos que ofrecen una lista de actividades
destinos_con_actividades(ListaActividades, Destinos) :-
    findall(Destino, (destino(Destino, _, _, _), todas_actividades(Destino, ListaActividades)), Destinos).

todas_actividades(Destino, []).
todas_actividades(Destino, [Act|Resto]) :-
    actividad(Destino, Act),
    todas_actividades(Destino, Resto).

% Regla para calcular el tiempo total necesario para visitar una lista de destinos
tiempo_total([], 0).
tiempo_total([Destino|Resto], TiempoTotal) :-
    destino(Destino, _, _, Tiempo),
    tiempo_total(Resto, TiempoResto),
    TiempoTotal is Tiempo + TiempoResto.

% Regla para encontrar combinaciones de N destinos que se ajusten al tiempo disponible
combinacion_destinos(N, TiempoMax, Combinacion, TiempoTotal) :-
    findall(Destino, destino(Destino, _, _, _), TodosDestinos),
    length(Subset, N),
    subset(Subset, TodosDestinos),
    tiempo_total(Subset, TiempoTotal),
    TiempoTotal =< TiempoMax,
    Combinacion = Subset.

% Predicado auxiliar para generar subconjuntos
subset([], []).
subset([X|Xs], [X|Ys]) :- subset(Xs, Ys).
subset(Xs, [_|Ys]) :- subset(Xs, Ys).

% Interfaz de linea de comandos
menu :-
    write('Sistema de Recomendacion de Rutas Turisticas'), nl,
    write('======================================='), nl,
    write('1. Buscar destinos por tipo'), nl,
    write('2. Buscar destinos por actividad'), nl,
    write('3. Encontrar ruta entre destinos'), nl,
    write('4. Recomendar itinerario personalizado'), nl,
    write('5. Buscar combinaciones de destinos'), nl,
    write('6. Salir'), nl,
    write('Ingrese su opcion: '),
    read(Opcion),
    procesar_opcion(Opcion).

procesar_opcion(1) :-
    write('Ingrese el tipo de destino (playa, arqueologico, urbano, cultural, colonial): '),
    read(Tipo),
    write('Ingrese su presupuesto maximo (bajo, medio, alto): '),
    read(Presupuesto),
    write('Ingrese el tiempo disponible en dias: '),
    read(Tiempo),
    findall(Destino, destino_adecuado(Destino, Tipo, Presupuesto, Tiempo), Destinos),
    write('Destinos recomendados: '), nl,
    mostrar_lista(Destinos),
    nl, menu.

procesar_opcion(2) :-
    write('Ingrese la actividad que desea realizar: '),
    read(Actividad),
    findall(Destino, destino_con_actividad(Destino, Actividad), Destinos),
    write('Destinos con esa actividad: '), nl,
    mostrar_lista(Destinos),
    nl, menu.

procesar_opcion(3) :-
    write('Ingrese el destino de origen: '),
    read(Origen),
    write('Ingrese el destino final: '),
    read(Destino),
    (ruta_mas_corta(Origen, Destino, Ruta, Distancia) ->
        write('Ruta mas corta: '), nl,
        mostrar_lista(Ruta), nl,
        write('Distancia total: '), write(Distancia), write(' km')
    ;
        write('No se encontro una ruta entre esos destinos.')
    ),
    nl, menu.

procesar_opcion(4) :-
    write('Ingrese el tipo de destino preferido: '),
    read(Tipo),
    write('Ingrese su presupuesto (bajo, medio, alto): '),
    read(Presupuesto),
    write('Ingrese el tiempo disponible en dias: '),
    read(Tiempo),
    (recomendar_itinerario(Tipo, Presupuesto, Tiempo, Itinerario) ->
        write('Itinerario recomendado: '), nl,
        mostrar_lista(Itinerario)
    ;
        write('No se encontraron destinos que cumplan con sus criterios.')
    ),
    nl, menu.

procesar_opcion(5) :-
    write('Ingrese el numero de destinos a visitar: '),
    read(N),
    write('Ingrese el tiempo maximo disponible en dias: '),
    read(TiempoMax),
    bagof([Comb, T], combinacion_destinos(N, TiempoMax, Comb, T), Combinaciones),
    write('Combinaciones posibles: '), nl,
    mostrar_combinaciones(Combinaciones),
    nl, menu.

procesar_opcion(6) :-
    write('Gracias por usar el sistema de recomendacion de rutas turisticas!'), nl.

procesar_opcion(_) :-
    write('Opcion no valida. Intente de nuevo.'), nl,
    menu.

% Predicados auxiliares para mostrar resultados
mostrar_lista([]).
mostrar_lista([X|Xs]) :-
    write('- '), write(X), nl,
    mostrar_lista(Xs).

mostrar_combinaciones([]).
mostrar_combinaciones([[Comb, Tiempo]|Resto]) :-
    write('Combinacion: '), mostrar_lista(Comb),
    write('  Tiempo total: '), write(Tiempo), write(' dias'), nl,
    mostrar_combinaciones(Resto).

% Iniciar el sistema
inicio :- menu.