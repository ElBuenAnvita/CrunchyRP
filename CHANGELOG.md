# Registro de cambios en esta versión (CHANGELOG)

## 1.4
Se añadió en la versión `1.4.0` las siguientes características:
- Corregido el error de la extensión deprecada por el mismo autor del mismo. Ahora usamos el reproductor nativo de Crunchyroll de HTML5
- Se vuelven a mostrar correctamente los timestamp
- Se precisó la manera de obtener la información de los vídeos

## 1.3
Se añadió en la versión `1.3.0` las siguientes características:
- **Corrección**: En la versión 1.2, era obligatorio usar la página en Inglés para que el Rich Presence funcionase. Ahora no, se creó un fix temporal.

## 1.2
Se añadió en la versión `1.2.0` las siguientes características:
- **Timestamp**: Ahora Crunchyroll Rich Presence cuenta con un timestamp que muestra el restante del vídeo. (Limitaciones: El timestamp puede mandar error o un tiempo incorrecto en caso de que el vídeo dure más de 59:59)
- **[Crunchyroll HTML5](https://chrome.google.com/webstore/detail/crunchyroll-html5/ihegfgnkffeibpmnajnoiemkcmlbmhmi)**: Como se había dicho dentro del README, se tenía planeado agregar este reproductor a la aplicación. Ahora ya no usas el nativo de Crunchyroll. _¡Cuidado! La extensión se encuentra dentro del path en la carpeta "extensions", no la elimines._